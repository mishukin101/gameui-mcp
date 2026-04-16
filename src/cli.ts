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
  gameui-mcp games
  gameui-mcp help

Commands:
  rules        Show design rules by category or screen type
  references   Show GameUI screenshot analysis references
  profile      Show game design pattern profile
  games        List available games

Examples:
  gameui-mcp rules --screen-type forge
  gameui-mcp rules --category confirmation-safeguards
  gameui-mcp references --game night-crows --type crafting
  gameui-mcp references --game night-crows --summary
  gameui-mcp profile --game night-crows
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
  case "help":
  default:
    printHelp();
    break;
}
