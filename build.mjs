import { cp, mkdir, rm, copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const rootDir = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(rootDir, "dist");
const task5Dir = resolve(rootDir, "Task_5_React_basics", "02_Task_Counter");
const task6Dir = resolve(rootDir, "Task_6_Travel_Tour_App");
const task7MiniDir = resolve(rootDir, "Task_7_React_hooks_project_pack", "01_Mini-projects");
const task7FoodDir = resolve(rootDir, "Task_7_React_hooks_project_pack", "02_Food_Receipe_App");
const npmCommand = process.platform === "win32" ? "cmd.exe" : "npm";
const npmArgs =
  process.platform === "win32"
    ? ["/c", "npm", "run", "build"]
    : ["run", "build"];

async function run(command, args, cwd) {
  await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      shell: false,
    });

    child.on("error", rejectPromise);
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePromise();
        return;
      }

      rejectPromise(
        new Error(`${command} ${args.join(" ")} failed with exit code ${code}`),
      );
    });
  });
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await copyFile(resolve(rootDir, "index.html"), resolve(distDir, "index.html"));
await copyFile(resolve(rootDir, "styles.css"), resolve(distDir, "styles.css"));

for (const folderName of [
  "Task_1_Eduford_Landing_Page",
  "Task_2_Javascript",
  "Task_3_Advanced JavaScript",
  "Task_4_FreeCodeCamp_certificate",
  "Task_8_NodeJS_Fundamentals",
]) {
  await cp(resolve(rootDir, folderName), resolve(distDir, folderName), {
    recursive: true,
  });
}

await run(npmCommand, npmArgs, task5Dir);
await run(npmCommand, npmArgs, task6Dir);
await run(npmCommand, npmArgs, task7MiniDir);
await run(npmCommand, npmArgs, task7FoodDir);

await cp(
  resolve(task5Dir, "dist"),
  resolve(distDir, "Task_5_React_basics", "02_Task_Counter", "dist"),
  { recursive: true },
);

await cp(
  resolve(task6Dir, "dist"),
  resolve(distDir, "Task_6_Travel_Tour_App", "dist"),
  { recursive: true },
);

await cp(
  resolve(task7MiniDir, "dist"),
  resolve(distDir, "Task_7_React_hooks_project_pack", "01_Mini-projects", "dist"),
  { recursive: true },
);

await cp(
  resolve(task7FoodDir, "dist"),
  resolve(distDir, "Task_7_React_hooks_project_pack", "02_Food_Receipe_App", "dist"),
  { recursive: true },
);
