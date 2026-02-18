import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SOURCE_DIR = path.resolve("src/assets");
const OUT_DIR = path.resolve("public/optimized");
const widths = [640, 960, 1280];

async function getImageFiles(dir) {
  const entries = await readdir(dir);
  return entries.filter((name) => /\.(jpg|jpeg|png)$/i.test(name));
}

async function run() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Missing dependency: sharp. Run `npm install -D sharp` first.");
    process.exit(1);
  }

  try {
    const sourceStats = await stat(SOURCE_DIR);
    if (!sourceStats.isDirectory()) {
      throw new Error("src/assets is not a directory");
    }
  } catch (error) {
    console.error("Image source directory not found:", SOURCE_DIR);
    console.error(error);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const files = await getImageFiles(SOURCE_DIR);

  if (files.length === 0) {
    console.log("No JPG/PNG files found in src/assets.");
    return;
  }

  const tasks = [];

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const name = path.parse(file).name;

    for (const width of widths) {
      const output = path.join(OUT_DIR, `${name}-${width}.webp`);
      tasks.push(
        sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 78 })
          .toFile(output)
      );
    }
  }

  await Promise.all(tasks);
  console.log(`Optimized ${files.length} images into ${OUT_DIR}`);
}

run().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exit(1);
});
