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

// ── Tool: design_advisor ──

server.tool(
  "design_advisor",
  `Comprehensive design guidance for a specific screen type.
Combines applicable design rules, game profile, and reference examples in one response.
Use this when starting a new screen design or reviewing an existing one.
Available screen types: hud, inventory, forge, shop, gacha, skill_tree, character, clan, quest_journal, settings, world_map, collection, chat, crafting, equipment_enhance, trade, results_screen, loading_screen, lobby`,
  {
    screen_type: z.string().describe("Screen type being designed (e.g., 'forge', 'inventory', 'shop')"),
    game: z.string().optional().describe("Target game style to reference (e.g., 'night-crows'). If omitted, returns rules only."),
  },
  async ({ screen_type, game }) => {
    const parts: string[] = [];

    // 1. Applicable rules
    const rules = getRulesByScreenType(config.knowledgePath, screen_type);
    if (rules.length > 0) {
      // Group by confidence priority
      const regulatory = rules.filter((r) => r.confidence.includes("regulatory"));
      const academic = rules.filter((r) => r.confidence.includes("academic") && !r.confidence.includes("regulatory"));
      const observed = rules.filter((r) => !r.confidence.includes("regulatory") && !r.confidence.includes("academic"));

      parts.push(`# Design Advisor: ${screen_type}\n`);
      parts.push(`## Applicable Design Rules (${rules.length} total)\n`);

      if (regulatory.length > 0) {
        parts.push(`### ⚠ Regulatory Requirements (${regulatory.length})\n`);
        for (const r of regulatory) {
          parts.push(`**${r.name}**\n${r.condition} → ${r.decision}\n_${r.rationale}_\n`);
        }
      }
      if (academic.length > 0) {
        parts.push(`### Research-Backed (${academic.length})\n`);
        for (const r of academic) {
          parts.push(`**${r.name}**\n${r.condition} → ${r.decision}\n_${r.rationale}_\n`);
        }
      }
      if (observed.length > 0) {
        parts.push(`### Observed Conventions (${observed.length})\n`);
        for (const r of observed) {
          parts.push(`**${r.name}**\n${r.condition} → ${r.decision}\n_${r.rationale}_\n`);
        }
      }
    } else {
      parts.push(`# Design Advisor: ${screen_type}\n\nNo specific rules found for this screen type.\n`);
    }

    // 2. State machines from navigation-flow
    const navRules = getRulesByCategory(config.knowledgePath, "navigation-flow");
    if (navRules) {
      const relevantSM = navRules.stateMachines.filter((sm) =>
        sm.toLowerCase().includes(screen_type.toLowerCase())
      );
      if (relevantSM.length > 0) {
        parts.push(`## State Machine\n`);
        parts.push(relevantSM.join("\n\n"));
        parts.push("");
      }
    }

    // 3. Game profile (if specified)
    if (game) {
      const profile = getGameProfile(config.gameui_path, game);
      if (profile) {
        parts.push(`## Game Profile: ${game}\n`);
        parts.push(profile);
        parts.push("");
      }

      // 4. Reference examples (summary + up to 3 full)
      const refs = getGameReferences(config.gameui_path, game, screen_type);
      if (refs.length > 0) {
        parts.push(`## Reference Examples: ${game} / ${screen_type} (${refs.length} files)\n`);
        const show = refs.slice(0, 3);
        for (const r of show) {
          parts.push(`---\n### ${r.filename}\n\n${r.content}\n`);
        }
        if (refs.length > 3) {
          parts.push(`> ${refs.length - 3} more references available. Use get_game_references for full list.\n`);
        }
      }
    }

    return { content: [{ type: "text", text: parts.join("\n") }] };
  }
);

// ── Tool: search_knowledge ──

server.tool(
  "search_knowledge",
  `Search across all design rules using keyword matching.
Searches rule names, conditions, decisions, and rationale for the given query terms.
For structured queries, prefer get_design_rules with screen_type or category parameters.`,
  {
    query: z.string().describe("Search terms (e.g., 'grid vs list', 'probability display', 'confirmation dialog')"),
  },
  async ({ query }) => {
    const allRules = loadAllRules(config.knowledgePath);
    const terms = query.toLowerCase().split(/\s+/);

    const results: { category: string; rule: string; name: string; snippet: string }[] = [];

    for (const ruleFile of allRules) {
      for (const rule of ruleFile.rules) {
        const searchText = `${rule.name} ${rule.condition} ${rule.decision} ${rule.rationale}`.toLowerCase();
        const matchCount = terms.filter((t) => searchText.includes(t)).length;
        if (matchCount >= Math.ceil(terms.length / 2)) {
          results.push({
            category: ruleFile.category,
            rule: rule.name,
            name: rule.name,
            snippet: `${rule.condition} → ${rule.decision}`,
          });
        }
      }
    }

    if (results.length === 0) {
      return { content: [{ type: "text", text: `No rules matched '${query}'. Try broader terms or use get_design_rules with screen_type.` }] };
    }

    const formatted = results
      .map((r) => `- **${r.name}** (${r.category})\n  ${r.snippet}`)
      .join("\n\n");

    return { content: [{ type: "text", text: `## Search results for "${query}"\n\n${results.length} rules matched.\n\n${formatted}` }] };
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
