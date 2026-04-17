#!/usr/bin/env node

import { loadConfig } from "./config.js";
import {
  listGames,
  getGameProfile,
  getGameReferences,
  getRulesByCategory,
  getRulesByScreenType,
  listRuleCategories,
  loadAllRules,
} from "./data.js";

const config = loadConfig();

function printHelp() {
  console.log(`
gameui-mcp — Game UI Design Knowledge Base CLI

Usage:
  gameui-mcp rules [--category <name>] [--screen-type <type>]
  gameui-mcp references --game <name> [--type <screen_type>] [--summary]
  gameui-mcp profile --game <name>
  gameui-mcp advise --screen-type <type> [--game <name>]
  gameui-mcp search "<query>"
  gameui-mcp games
  gameui-mcp help

Commands:
  rules        Show design rules by category or screen type
  references   Show GameUI screenshot analysis references
  profile      Show game design pattern profile
  advise       Comprehensive design guidance (rules + profile + references)
  search       Search across all design rules by keyword
  games        List available games

Examples:
  gameui-mcp rules --screen-type forge
  gameui-mcp rules --category confirmation-safeguards
  gameui-mcp references --game night-crows --type crafting
  gameui-mcp references --game night-crows --summary
  gameui-mcp profile --game night-crows
  gameui-mcp advise --screen-type forge --game night-crows
  gameui-mcp search "grid vs list"
`);
}

function parseArgs(args: string[]): { command: string; flags: Record<string, string | boolean> } {
  const command = args[0] ?? "help";
  const flags: Record<string, string | boolean> = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    }
  }

  return { command, flags };
}

function cmdRules(flags: Record<string, string | boolean>) {
  const category = flags["category"] as string | undefined;
  const screenType = flags["screen-type"] as string | undefined;

  if (!category && !screenType) {
    const categories = listRuleCategories(config.knowledgePath);
    console.log("Available rule categories:\n");
    for (const c of categories) {
      console.log(`  ${c.category} (${c.domain}) — ${c.ruleCount} rules`);
    }
    console.log("\nUse --category <name> or --screen-type <type> to filter.");
    return;
  }

  if (category) {
    const ruleFile = getRulesByCategory(config.knowledgePath, category);
    if (!ruleFile) {
      console.error(`Category '${category}' not found.`);
      process.exit(1);
      return;
    }
    console.log(ruleFile.rawContent);
    return;
  }

  if (screenType) {
    const rules = getRulesByScreenType(config.knowledgePath, screenType);
    if (rules.length === 0) {
      console.log(`No rules found for screen_type '${screenType}'.`);
      return;
    }
    console.log(`Design rules for screen_type: ${screenType} (${rules.length} rules)\n`);
    for (const r of rules) {
      console.log(`### ${r.name}`);
      console.log(`Condition: ${r.condition}`);
      console.log(`Decision: ${r.decision}`);
      console.log(`Rationale: ${r.rationale}`);
      console.log(`Confidence: ${r.confidence}`);
      console.log(`Sources: ${r.sources}`);
      console.log();
    }
  }
}

function cmdReferences(flags: Record<string, string | boolean>) {
  const game = flags["game"] as string | undefined;
  if (!game) {
    console.error("--game is required. Available: " + listGames(config.gameui_path).join(", "));
    process.exit(1);
  }

  const screenType = (flags["type"] as string) || undefined;
  const summary = flags["summary"] === true;
  const refs = getGameReferences(config.gameui_path, game, screenType);

  if (refs.length === 0) {
    console.log(`No references found for '${game}'${screenType ? ` (${screenType})` : ""}.`);
    return;
  }

  if (summary) {
    console.log(`${game} references${screenType ? ` (${screenType})` : ""}: ${refs.length} files\n`);
    for (const r of refs) {
      console.log(`  ${r.filename} — screen_type: ${r.screenType ?? "?"}, display_mode: ${r.displayMode ?? "?"}`);
    }
    return;
  }

  const limited = refs.slice(0, 5);
  for (const r of limited) {
    console.log(`\n${"=".repeat(60)}\n${r.filename}\n${"=".repeat(60)}\n`);
    console.log(r.content);
  }
  if (refs.length > 5) {
    console.log(`\n... ${refs.length - 5} more files. Use --summary to see all.`);
  }
}

function cmdProfile(flags: Record<string, string | boolean>) {
  const game = flags["game"] as string | undefined;
  if (!game) {
    console.error("--game is required. Available: " + listGames(config.gameui_path).join(", "));
    process.exit(1);
  }

  const profile = getGameProfile(config.gameui_path, game);
  if (!profile) {
    console.error(`Profile not found for '${game}'.`);
    process.exit(1);
  }
  console.log(profile);
}

function cmdAdvise(flags: Record<string, string | boolean>) {
  const screenType = flags["screen-type"] as string | undefined;
  if (!screenType) {
    console.error("--screen-type is required.");
    process.exit(1);
  }

  const game = flags["game"] as string | undefined;

  // 1. Rules
  const rules = getRulesByScreenType(config.knowledgePath, screenType);
  console.log(`# Design Advisor: ${screenType}\n`);

  if (rules.length > 0) {
    const regulatory = rules.filter((r) => r.confidence.includes("regulatory"));
    const academic = rules.filter((r) => r.confidence.includes("academic") && !r.confidence.includes("regulatory"));
    const observed = rules.filter((r) => !r.confidence.includes("regulatory") && !r.confidence.includes("academic"));

    console.log(`## Applicable Design Rules (${rules.length} total)\n`);

    if (regulatory.length > 0) {
      console.log(`### Regulatory Requirements (${regulatory.length})\n`);
      for (const r of regulatory) {
        console.log(`**${r.name}**\n${r.condition} → ${r.decision}\n${r.rationale}\n`);
      }
    }
    if (academic.length > 0) {
      console.log(`### Research-Backed (${academic.length})\n`);
      for (const r of academic) {
        console.log(`**${r.name}**\n${r.condition} → ${r.decision}\n${r.rationale}\n`);
      }
    }
    if (observed.length > 0) {
      console.log(`### Observed Conventions (${observed.length})\n`);
      for (const r of observed) {
        console.log(`**${r.name}**\n${r.condition} → ${r.decision}\n${r.rationale}\n`);
      }
    }
  }

  // 2. State machines
  const navRules = getRulesByCategory(config.knowledgePath, "navigation-flow");
  if (navRules) {
    const relevantSM = navRules.stateMachines.filter((sm) =>
      sm.toLowerCase().includes(screenType.toLowerCase())
    );
    if (relevantSM.length > 0) {
      console.log(`## State Machine\n`);
      console.log(relevantSM.join("\n\n"));
      console.log();
    }
  }

  // 3. Game data
  if (game) {
    const profile = getGameProfile(config.gameui_path, game);
    if (profile) {
      console.log(`## Game Profile: ${game}\n`);
      console.log(profile);
    }

    const refs = getGameReferences(config.gameui_path, game, screenType);
    if (refs.length > 0) {
      console.log(`## Reference Examples: ${game} / ${screenType} (${refs.length} files)\n`);
      const show = refs.slice(0, 3);
      for (const r of show) {
        console.log(`---\n### ${r.filename}\n\n${r.content}\n`);
      }
      if (refs.length > 3) {
        console.log(`... ${refs.length - 3} more references available.`);
      }
    }
  }
}

function cmdSearch(flags: Record<string, string | boolean>) {
  // Get query from remaining args
  const query = Object.keys(flags).find((k) => !k.startsWith("-") && flags[k] === true) || (flags["_query"] as string);

  // Re-parse to get positional arg
  const args = process.argv.slice(3);
  const searchQuery = args.filter((a) => !a.startsWith("--")).join(" ");

  if (!searchQuery) {
    console.error("Search query is required. Usage: gameui-mcp search \"query terms\"");
    process.exit(1);
  }

  const allRules = loadAllRules(config.knowledgePath);
  const terms = searchQuery.toLowerCase().split(/\s+/);

  const results: { category: string; name: string; snippet: string }[] = [];

  for (const ruleFile of allRules) {
    for (const rule of ruleFile.rules) {
      const searchText = `${rule.name} ${rule.condition} ${rule.decision} ${rule.rationale}`.toLowerCase();
      const matchCount = terms.filter((t) => searchText.includes(t)).length;
      if (matchCount >= Math.ceil(terms.length / 2)) {
        results.push({
          category: ruleFile.category,
          name: rule.name,
          snippet: `${rule.condition} → ${rule.decision}`,
        });
      }
    }
  }

  if (results.length === 0) {
    console.log(`No rules matched '${searchQuery}'.`);
    return;
  }

  console.log(`Search results for "${searchQuery}" (${results.length} rules)\n`);
  for (const r of results) {
    console.log(`  ${r.name} (${r.category})`);
    console.log(`    ${r.snippet}\n`);
  }
}

function cmdGames() {
  const games = listGames(config.gameui_path);
  console.log("Available games:\n");
  for (const g of games) {
    console.log(`  ${g}`);
  }
}

// ── Main ──

const { command, flags } = parseArgs(process.argv.slice(2));

switch (command) {
  case "rules":
    cmdRules(flags);
    break;
  case "references":
    cmdReferences(flags);
    break;
  case "profile":
    cmdProfile(flags);
    break;
  case "games":
    cmdGames();
    break;
  case "advise":
    cmdAdvise(flags);
    break;
  case "search":
    cmdSearch(flags);
    break;
  case "help":
  default:
    printHelp();
    break;
}
