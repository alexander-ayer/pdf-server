// modules/pdfValidation.js
// Validates requested PDF Filenames before serving them

const fs = require("fs");
const path = require("path");
const { PDF_DIR } = require("./pdfDiscovery");

// Ensures the filename is safe and well-formed
function isSafeFilename(filename) {
  return typeof filename === "string"
    && filename.length > 0
    && !filename.includes("/")    // Prevent nested paths
    && !filename.includes("\\")  // Prevent windows traversal
    && filename.toLowerCase().endsWith(".pdf");
}

// Resolves and validates the full path to a PDF file
function resolvePdfPath(filename) {
  // Reject unsafe filenames immediately
  if (!isSafeFilename(filename)) return null;

  const fullPath = path.resolve(PDF_DIR, filename);

  // Ensures the resolved path stays inside the pdfs dir
  const pdfDirResolved = path.resolve(PDF_DIR) + path.sep;
  if (!fullPath.startsWith(pdfDirResolved)) return null;

  // File Actually eists
  if (!fs.existsSync(fullPath)) return null;

  return fullPath;
}

module.exports = { isSafeFilename, resolvePdfPath };
