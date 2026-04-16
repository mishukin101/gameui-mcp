import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, basename, extname } from "node:path";

/** Parse screen_type from a reference markdown file's frontmatter-style header */
function parseScreenType(content: string): string | null {
  const match = content.match(/^screen_type:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

/** Parse display_mode from a reference markdown file */
function parseDisplayMode(content: string): string | null {
  const match = content.match(/^display_mode:\s*(.+)$/m);
  return match ? match[1].trim() : null;
}

// ── GameUI Data Access ──

export function listGames(gameuiPath: string): string[] {
  const refDir = resolve(gameuiPath, "reference");
  if (!existsSync(refDir)) return [];
  return readdirSync(refDir, { withFileTypes: true })
    .filter((d: { isDirectory(): boolean }) => d.isDirectory())
    .map((d: { name: string }) => d.name);
}

export function getGameProfile(gameuiPath: string, game: string): string | null {
  const profilePath = resolve(gameuiPath, "profiles", `${game}.yaml`);
  if (!existsSync(profilePath)) return null;
  return readFileSync(profilePath, "utf-8");
}

export interface ReferenceFile {
  filename: string;
  screenType: string | null;
  displayMode: string | null;
  content: string;
}

export function getGameReferences(
  gameuiPath: string,
  game: string,
  screenType?: string
): ReferenceFile[] {
  const refDir = resolve(gameuiPath, "reference", game);
  if (!existsSync(refDir)) return [];

  const files = readdirSync(refDir)
    .filter((f: string) => f.endsWith(".md") && !f.startsWith("_"));

  const results: ReferenceFile[] = [];
  for (const f of files) {
    const content = readFileSync(resolve(refDir, f), "utf-8");
    const st = parseScreenType(content);
    const dm = parseDisplayMode(content);

    if (screenType && st !== screenType) continue;

    results.push({
      filename: basename(f, extname(f)),
      screenType: st,
      displayMode: dm,
      content,
    });
  }
  return results;
}

// ── Knowledge Rules Access ──

export interface Rule {
  name: string;
  condition: string;
  decision: string;
  rationale: string;
  confidence: string;
  screenTypes: string[];
  sources: string;
}

export interface RuleFile {
  category: string;
  domain: string;
  relatedScreenTypes: string[];
  rules: Rule[];
  stateMachines: string[];
  rawContent: string;
}

function parseRuleFile(filename: string, content: string): RuleFile {
  const category = basename(filename, ".md");

  // Parse header metadata
  const domainMatch = content.match(/^Domain:\s*(.+)$/m);
  const domain = domainMatch ? domainMatch[1].trim() : "unknown";

  const relatedMatch = content.match(/^Related screen types:\s*(.+)$/m);
  const relatedScreenTypes = relatedMatch
    ? relatedMatch[1].split(",").map((s) => s.trim())
    : [];

  // Parse individual rules
  const rules: Rule[] = [];
  const stateMachines: string[] = [];
  const sections = content.split(/^## /m).slice(1);

  for (const section of sections) {
    const titleLine = section.split("\n")[0].trim();

    if (titleLine.startsWith("State Machine:")) {
      stateMachines.push("## " + section.trim());
      continue;
    }

    if (!titleLine.startsWith("Rule:")) continue;

    const name = titleLine.replace("Rule:", "").trim();
    const condMatch = section.match(/\*\*Condition\*\*:\s*(.+)/);
    const decMatch = section.match(/\*\*Decision\*\*:\s*(.+)/);
    const ratMatch = section.match(/\*\*Rationale\*\*:\s*(.+)/);
    const confMatch = section.match(/\*\*Confidence\*\*:\s*(.+)/);
    const stMatch = section.match(/\*\*Screen types\*\*:\s*(.+)/);
    const srcMatch = section.match(/\*\*Sources\*\*:\s*(.+)/);

    rules.push({
      name,
      condition: condMatch?.[1]?.trim() ?? "",
      decision: decMatch?.[1]?.trim() ?? "",
      rationale: ratMatch?.[1]?.trim() ?? "",
      confidence: confMatch?.[1]?.trim() ?? "",
      screenTypes: stMatch ? stMatch[1].split(",").map((s) => s.trim()) : [],
      sources: srcMatch?.[1]?.trim() ?? "",
    });
  }

  return { category, domain, relatedScreenTypes, rules, stateMachines, rawContent: content };
}

export function loadAllRules(knowledgePath: string): RuleFile[] {
  const rulesDir = resolve(knowledgePath, "rules");
  if (!existsSync(rulesDir)) return [];

  const files = readdirSync(rulesDir).filter((f: string) => f.endsWith(".md"));
  return files.map((f: string) => {
    const content = readFileSync(resolve(rulesDir, f), "utf-8");
    return parseRuleFile(f, content);
  });
}

export function getRulesByCategory(knowledgePath: string, category: string): RuleFile | null {
  const allRules = loadAllRules(knowledgePath);
  return allRules.find((r) => r.category === category) ?? null;
}

export function getRulesByScreenType(knowledgePath: string, screenType: string): Rule[] {
  const allRules = loadAllRules(knowledgePath);
  const matched: Rule[] = [];
  for (const ruleFile of allRules) {
    for (const rule of ruleFile.rules) {
      if (rule.screenTypes.includes(screenType)) {
        matched.push(rule);
      }
    }
  }
  return matched;
}

export function listRuleCategories(knowledgePath: string): { category: string; domain: string; ruleCount: number }[] {
  const allRules = loadAllRules(knowledgePath);
  return allRules.map((r) => ({
    category: r.category,
    domain: r.domain,
    ruleCount: r.rules.length,
  }));
}
