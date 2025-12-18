// modules/metadata.js
// Loads and parses JSON metadata describing the PDFs.

const fs = require("fs");
const path = require("path");

// Path to the metadata JSON file
const METADATA_PATH = path.join(__dirname, "..", "metadata", "pdfs.json");

function loadMetadata() {
  // If metadata file is missing, return empty metadata
  if (!fs.existsSync(METADATA_PATH)) return new Map();

  // Read and parse JSON file
  const raw = fs.readFileSync(METADATA_PATH, "utf-8");
  const parsed = JSON.parse(raw);

  // Normalize metadata into a Map for fast lookups by filename
  const map = new Map();
  for (const item of parsed) {
    if (!item || typeof item.filename !== "string") continue;

    map.set(item.filename, {
      title: item.title || item.filename,
      description: item.description || ""
    });
  }

  return map;
}

module.exports = { loadMetadata };
