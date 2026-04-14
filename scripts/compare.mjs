/**
 * Visual Comparison Script
 * Compares a current screenshot against a reference image using pixelmatch.
 * Returns a similarity percentage and generates a diff image.
 *
 * Usage:
 *   node scripts/compare.mjs <reference.png> <current.png> [threshold]
 *
 * Examples:
 *   node scripts/compare.mjs reference-designs/hero.png screenshots/current-home-desktop.png
 *   node scripts/compare.mjs reference-designs/hero.png screenshots/current-home-desktop.png 0.1
 *
 * Output:
 *   - Similarity percentage (0-100)
 *   - Diff image saved to screenshots/diff-<timestamp>.png
 *   - JSON summary to stdout for programmatic use
 */

import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

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
  // Simple nearest-neighbor resize to match dimensions
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

async function compare() {
  const referencePath = process.argv[2];
  const currentPath = process.argv[3];
  const threshold = parseFloat(process.argv[4] || "0.1");

  if (!referencePath || !currentPath) {
    console.error("Usage: node scripts/compare.mjs <reference.png> <current.png> [threshold]");
    process.exit(1);
  }

  if (!fs.existsSync(referencePath)) {
    console.error(`Reference image not found: ${referencePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(currentPath)) {
    console.error(`Current screenshot not found: ${currentPath}`);
    process.exit(1);
  }

  let refImg = await loadPNG(referencePath);
  let curImg = await loadPNG(currentPath);

  // Resize to match dimensions (use the reference as the target)
  const width = refImg.width;
  const height = refImg.height;

  if (curImg.width !== width || curImg.height !== height) {
    console.log(
      `Resizing current (${curImg.width}x${curImg.height}) to match reference (${width}x${height})`
    );
    curImg = resizePNG(curImg, width, height);
  }

  // Create diff image
  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(refImg.data, curImg.data, diff.data, width, height, {
    threshold,
    includeAA: false,
  });

  const totalPixels = width * height;
  const similarity = ((1 - mismatchedPixels / totalPixels) * 100).toFixed(2);

  // Save diff image
  const timestamp = Date.now();
  const diffPath = path.join(ROOT, "screenshots", `diff-${timestamp}.png`);
  diff.pack().pipe(fs.createWriteStream(diffPath));

  const result = {
    similarity: parseFloat(similarity),
    mismatchedPixels,
    totalPixels,
    threshold,
    referenceDimensions: { width: refImg.width, height: refImg.height },
    currentDimensions: { width, height },
    diffImage: diffPath,
    reference: referencePath,
    current: currentPath,
    timestamp: new Date().toISOString(),
  };

  console.log(JSON.stringify(result, null, 2));

  // Also print human-readable summary
  console.log(`\n--- Visual Comparison Summary ---`);
  console.log(`Reference: ${referencePath}`);
  console.log(`Current:   ${currentPath}`);
  console.log(`Similarity: ${similarity}%`);
  console.log(`Mismatched: ${mismatchedPixels.toLocaleString()} / ${totalPixels.toLocaleString()} pixels`);
  console.log(`Diff image: ${diffPath}`);

  if (parseFloat(similarity) >= 95) {
    console.log(`\nRESULT: PASS (>= 95% match)`);
  } else {
    console.log(`\nRESULT: NEEDS WORK (< 95% match)`);
  }

  return result;
}

compare().catch((err) => {
  console.error("Comparison failed:", err.message);
  process.exit(1);
});
