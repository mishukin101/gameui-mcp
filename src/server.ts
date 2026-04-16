#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { loadConfig } from "./config.js";
import {
  listGames,
  getGameProfile,
  getGameReferences,
  loadAllRules,
  getRulesByCategory,
  getRulesByScreenType,
  listRuleCategories,
} from "./data.js";

const config = loadConfig();

const server = new McpServer({
  name: "gameui-mcp",
  version: "1.0.0",
});

// ── Tool: get_design_rules ──

server.tool(
  "get_design_rules",
  `Retrieve game UI design rules for a specific category or screen type.
Rules are IF/THEN decision guidelines with confidence levels (regulatory-requirement, academic-evidence, observed-convention).
Use 'category' to get all rules in a category, or 'screen_type' to find all rules applicable to a screen.
Available categories: ${listRuleCategories(config.knowledgePath).map((r) => r.category).join(", ")}`,
  {
    category: z.string().optional().describe("Rule category name (e.g., 'touch-ergonomics', 'navigation-flow', 'confirmation-safeguards')"),
    screen_type: z.string().optional().describe("Screen type to find applicable rules for (e.g., 'forge', 'inventory', 'shop', 'gacha')"),
  },
  async ({ category, screen_type }) => {
    if (!category && !screen_type) {
      const categories = listRuleCategories(config.knowledgePath);
      const listing = categories
        .map((c) => `- **${c.category}** (${c.domain}) — ${c.ruleCount} rules`)
        .join("\n");
      return { content: [{ type: "text", text: `Available rule categories:\n\n${listing}\n\nSpecify 'category' or 'screen_type' to retrieve rules.` }] };
    }

    if (category) {
      const ruleFile = getRulesByCategory(config.knowledgePath, category);
      if (!ruleFile) {
        return { content: [{ type: "text", text: `Category '${category}' not found. Available: ${listRuleCategories(config.knowledgePath).map((r) => r.category).join(", ")}` }] };
      }
      return { content: [{ type: "text", text: ruleFile.rawContent }] };
    }

    // screen_type filter
    const rules = getRulesByScreenType(config.knowledgePath, screen_type!);
    if (rules.length === 0) {
      return { content: [{ type: "text", text: `No rules found for screen_type '${screen_type}'.` }] };
    }

    const formatted = rules
      .map((r) => `### ${r.name}\n**Condition**: ${r.condition}\n**Decision**: ${r.decision}\n**Rationale**: ${r.rationale}\n**Confidence**: ${r.confidence}\n**Sources**: ${r.sources}`)
      .join("\n\n---\n\n");

    return {
      content: [{ type: "text", text: `## Design rules for screen_type: ${screen_type}\n\n${rules.length} rules found.\n\n${formatted}` }],
    };
  }
);

// ── Tool: get_game_references ──

server.tool(
  "get_game_references",
  `Retrieve screenshot analysis references from GameUI for a specific game and optional screen type.
Each reference contains layout hierarchy, element roles, and design signals observed from actual game screenshots.
Available games: ${listGames(config.gameui_path).join(", ")}`,
  {
    game: z.string().describe("Game name (e.g., 'night-crows', 'legend-of-ymir', 'lineage-w')"),
    screen_type: z.string().optional().describe("Filter by screen type (e.g., 'forge', 'inventory', 'crafting')"),
    summary: z.boolean().optional().default(false).describe("If true, return only metadata (filename, screen_type, display_mode) without full content"),
  },
  async ({ game, screen_type, summary }) => {
    const refs = getGameReferences(config.gameui_path, game, screen_type);
    if (refs.length === 0) {
      const games = listGames(config.gameui_path);
      return { content: [{ type: "text", text: `No references found for game '${game}'${screen_type ? ` with screen_type '${screen_type}'` : ""}.\nAvailable games: ${games.join(", ")}` }] };
    }

    if (summary) {
      const listing = refs
        .map((r) => `- **${r.filename}** — screen_type: ${r.screenType ?? "unknown"}, display_mode: ${r.displayMode ?? "unknown"}`)
        .join("\n");
      return { content: [{ type: "text", text: `## ${game} references${screen_type ? ` (${screen_type})` : ""}\n\n${refs.length} files found.\n\n${listing}` }] };
    }

    // Full content — limit to 5 files to avoid token overflow
    const limited = refs.slice(0, 5);
    const formatted = limited.map((r) => `---\n# ${r.filename}\n\n${r.content}`).join("\n\n");
    const note = refs.length > 5 ? `\n\n> Showing 5 of ${refs.length} files. Use summary=true to see all, or narrow with screen_type.` : "";

    return { content: [{ type: "text", text: formatted + note }] };
  }
);

// ── Tool: get_game_profile ──

server.tool(
  "get_game_profile",
  `Retrieve the design pattern profile for a specific game.
Profiles are bottom-up aggregations of observed patterns across all analyzed screenshots: color roles, layout conventions, common element roles, recurring patterns, and screen type distribution.
Available games: ${listGames(config.gameui_path).join(", ")}`,
  {
    game: z.string().describe("Game name (e.g., 'night-crows', 'legend-of-ymir')"),
  },
  async ({ game }) => {
    const profile = getGameProfile(config.gameui_path, game);
    if (!profile) {
      const games = listGames(config.gameui_path);
      return { content: [{ type: "text", text: `Profile not found for '${game}'. Available: ${games.join(", ")}` }] };
    }
    return { content: [{ type: "text", text: profile }] };
  }
);

// ── Start Server ──

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
