// modules/pdfDiscovery.js
const fs = require("fs");
const path = require("path");

// path to the pdf storage directory
const PDF_DIR = path.join(__dirname, "..", "pdfs");

// In-memory cache to avoid repeated reads
let cache = null;
let cacheTimeMs = 0;
const CACHE_TTL_MS = 10_000; // 10 Seconds

function listPdfs() {
  const now = Date.now();

  // Return cached result if still valid
  if (cache && (now - cacheTimeMs) < CACHE_TTL_MS) return cache;

  // Read directory and filter for .pdf files only
  const files = fs.readdirSync(PDF_DIR, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => name.toLowerCase().endsWith(".pdf"));

  // Update cache
  cache = files;
  cacheTimeMs = now;

  return files;
}

module.exports = { listPdfs, PDF_DIR };
