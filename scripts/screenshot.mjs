/**
 * Screenshot Capture Script
 * Takes a screenshot of a specific page/route from the running dev server.
 *
 * Usage:
 *   node scripts/screenshot.mjs [route] [viewport] [output]
 *
 * Examples:
 *   node scripts/screenshot.mjs /              # homepage, desktop
 *   node scripts/screenshot.mjs /about mobile  # about page, mobile
 *   node scripts/screenshot.mjs / desktop screenshots/home-current.png
 */

import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

const DEV_SERVER = "http://localhost:3000";

async function screenshot() {
  const route = process.argv[2] || "/";
  const viewportName = process.argv[3] || "desktop";
  const outputPath =
    process.argv[4] ||
    path.join(
      ROOT,
      "screenshots",
      `current-${route.replace(/\//g, "-").replace(/^-/, "home")}-${viewportName}.png`
    );

  const viewport = VIEWPORTS[viewportName] || VIEWPORTS.desktop;

  console.log(`Capturing ${DEV_SERVER}${route} at ${viewport.width}x${viewport.height}...`);

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

    // Wait for animations to settle
    await new Promise((r) => setTimeout(r, 2000));

    // Take full-page screenshot
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: "png",
    });

    console.log(`Screenshot saved: ${outputPath}`);
    return outputPath;
  } finally {
    await browser.close();
  }
}

screenshot().catch((err) => {
  console.error("Screenshot failed:", err.message);
  process.exit(1);
});
