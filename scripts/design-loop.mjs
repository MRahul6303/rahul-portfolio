/**
 * Design Comparison Loop
 * Captures a screenshot and compares it against a reference image.
 * Designed to be called repeatedly by Claude during the design iteration process.
 *
 * Usage:
 *   node scripts/design-loop.mjs <reference.png> [route] [viewport]
 *
 * Examples:
 *   node scripts/design-loop.mjs reference-designs/hero-v1.png / desktop
 *   node scripts/design-loop.mjs reference-designs/about.png /about desktop
 *
 * This script:
 *   1. Takes a screenshot of the specified route
 *   2. Compares it with the reference image
 *   3. Outputs similarity score + diff image path
 *   4. Exits with code 0 if >= 95%, code 1 if below
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

const DEV_SERVER = "http://localhost:3000";
const TARGET_SIMILARITY = 95;

function loadPNG(filePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath).pipe(new PNG());
    stream.on("parsed", function () {
      resolve(this);
    });
    stream.on("error", reject);
  });
}

function resizePNG(src, targetWidth, targetHeight) {
  const dst = new PNG({ width: targetWidth, height: targetHeight });
  const xRatio = src.width / targetWidth;
  const yRatio = src.height / targetHeight;
  for (let y = 0; y < targetHeight; y++) {
    for (let x = 0; x < targetWidth; x++) {
      const srcX = Math.floor(x * xRatio);
      const srcY = Math.floor(y * yRatio);
      const srcIdx = (srcY * src.width + srcX) * 4;
      const dstIdx = (y * targetWidth + x) * 4;
      dst.data[dstIdx] = src.data[srcIdx];
      dst.data[dstIdx + 1] = src.data[srcIdx + 1];
      dst.data[dstIdx + 2] = src.data[srcIdx + 2];
      dst.data[dstIdx + 3] = src.data[srcIdx + 3];
    }
  }
  return dst;
}

async function run() {
  const referencePath = process.argv[2];
  const route = process.argv[3] || "/";
  const viewportName = process.argv[4] || "desktop";

  if (!referencePath) {
    console.error("Usage: node scripts/design-loop.mjs <reference.png> [route] [viewport]");
    process.exit(1);
  }

  if (!fs.existsSync(referencePath)) {
    console.error(`Reference image not found: ${referencePath}`);
    process.exit(1);
  }

  const viewport = VIEWPORTS[viewportName] || VIEWPORTS.desktop;
  const iteration = Date.now();
  const screenshotPath = path.join(ROOT, "screenshots", `iteration-${iteration}.png`);
  const diffPath = path.join(ROOT, "screenshots", `diff-${iteration}.png`);

  // Step 1: Capture screenshot
  console.log(`[1/3] Capturing ${DEV_SERVER}${route} at ${viewport.width}x${viewport.height}...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(viewport);
    await page.goto(`${DEV_SERVER}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for animations/fonts to settle
    await new Promise((r) => setTimeout(r, 2500));

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: "png",
    });
    console.log(`   Screenshot saved: ${screenshotPath}`);
  } finally {
    await browser.close();
  }

  // Step 2: Compare
  console.log(`[2/3] Comparing against reference: ${referencePath}`);
  let refImg = await loadPNG(referencePath);
  let curImg = await loadPNG(screenshotPath);

  const width = refImg.width;
  const height = refImg.height;

  if (curImg.width !== width || curImg.height !== height) {
    console.log(`   Resizing: ${curImg.width}x${curImg.height} -> ${width}x${height}`);
    curImg = resizePNG(curImg, width, height);
  }

  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(refImg.data, curImg.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });

  const totalPixels = width * height;
  const similarity = ((1 - mismatchedPixels / totalPixels) * 100).toFixed(2);

  // Save diff
  await new Promise((resolve, reject) => {
    const stream = diff.pack().pipe(fs.createWriteStream(diffPath));
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  // Step 3: Report
  console.log(`[3/3] Results:`);
  console.log(`   Similarity:  ${similarity}%`);
  console.log(`   Mismatched:  ${mismatchedPixels.toLocaleString()} / ${totalPixels.toLocaleString()} pixels`);
  console.log(`   Screenshot:  ${screenshotPath}`);
  console.log(`   Diff image:  ${diffPath}`);
  console.log(`   Target:      >= ${TARGET_SIMILARITY}%`);

  if (parseFloat(similarity) >= TARGET_SIMILARITY) {
    console.log(`\n   STATUS: PASS - Design matches reference!`);
    process.exit(0);
  } else {
    console.log(`\n   STATUS: ITERATE - ${(TARGET_SIMILARITY - parseFloat(similarity)).toFixed(2)}% gap remaining`);
    console.log(`   -> Review the diff image to see where the differences are`);
    console.log(`   -> Make changes and run this script again`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Design loop failed:", err.message);
  process.exit(1);
});
