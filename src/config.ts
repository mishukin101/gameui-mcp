import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

interface Config {
  gameui_path: string;
  knowledgePath: string;
}

export function loadConfig(): Config {
  const configPath = resolve(PROJECT_ROOT, "gameui.config.json");
  if (!existsSync(configPath)) {
    throw new Error(`Config not found: ${configPath}\nCreate gameui.config.json with { "gameui_path": "/path/to/GameUI" }`);
  }

  const raw = JSON.parse(readFileSync(configPath, "utf-8"));
  const gameuiPath = raw.gameui_path;

  if (!gameuiPath || !existsSync(gameuiPath)) {
    throw new Error(`GameUI path not found: ${gameuiPath}\nUpdate gameui.config.json with a valid path.`);
  }

  return {
    gameui_path: gameuiPath,
    knowledgePath: resolve(PROJECT_ROOT, "knowledge"),
  };
}
