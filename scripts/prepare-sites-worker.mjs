import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const project = process.cwd();
const output = resolve(project, ".output");
const server = resolve(output, "server");
const publicAssets = resolve(output, "public");
const hosting = resolve(project, ".openai/hosting.json");
const dist = resolve(project, "dist");

for (const required of [resolve(server, "index.mjs"), publicAssets, hosting]) {
  if (!existsSync(required)) throw new Error(`Missing required Site build output: ${required}`);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dirname(resolve(dist, "server/index.mjs")), { recursive: true });
cpSync(server, resolve(dist, "server"), { recursive: true });
cpSync(publicAssets, resolve(dist, "public"), { recursive: true });
cpSync(publicAssets, resolve(dist, "server/public"), { recursive: true });
mkdirSync(resolve(dist, ".openai"), { recursive: true });
cpSync(hosting, resolve(dist, ".openai/hosting.json"));
writeFileSync(resolve(dist, "server/index.js"), "export { default } from './index.mjs';\n");
const workerConfigPath = resolve(dist, "server/wrangler.json");
const workerConfig = JSON.parse(readFileSync(workerConfigPath, "utf8"));
if (!workerConfig.assets || workerConfig.assets.binding !== "ASSETS") {
  throw new Error("The generated Worker config must expose its public assets as ASSETS.");
}
workerConfig.assets.directory = "public";
writeFileSync(workerConfigPath, `${JSON.stringify(workerConfig, null, 2)}\n`);
