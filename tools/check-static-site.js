const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = ["index.html", "Home.html"];
const assetPattern = /(?:src|href)="([^"]+)"/g;
const targetBlankPattern = /<a\b[^>]*target="_blank"[^>]*>/gi;
const relPattern = /\brel="([^"]*)"/i;

const issues = [];

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

for (const file of htmlFiles) {
  const filePath = path.join(root, file);
  const content = fs.readFileSync(filePath, "utf8");

  let match;
  while ((match = assetPattern.exec(content)) !== null) {
    const value = match[1];
    const isLocalAsset =
      value &&
      !value.startsWith("http://") &&
      !value.startsWith("https://") &&
      !value.startsWith("mailto:") &&
      !value.startsWith("tel:") &&
      !value.startsWith("#") &&
      !value.startsWith("data:");

    if (isLocalAsset && !fileExists(value)) {
      issues.push(`${file}: missing local reference "${value}"`);
    }
  }

  const externalLinks = content.match(targetBlankPattern) || [];
  for (const link of externalLinks) {
    const relMatch = link.match(relPattern);
    const relValue = relMatch ? relMatch[1] : "";
    if (!relValue.includes("noopener") || !relValue.includes("noreferrer")) {
      issues.push(
        `${file}: target="_blank" link is missing rel="noopener noreferrer"`,
      );
    }
  }
}

if (issues.length > 0) {
  console.error("Static site checks failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Static site checks passed.");
