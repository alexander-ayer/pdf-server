// routes/router.js

const express = require("express");
const { listPdfs } = require("../modules/pdfDiscovery");
const { resolvePdfPath } = require("../modules/pdfValidation");
const { loadMetadata } = require("../modules/metadata");

// HTML escaping helper function
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Build the router
function buildRouter() {
  const router = express.Router();

  // Home page
  router.get("/", (req, res) => {
    res.status(200).send(`
      <html>
        <head>
          <title>Software Engineering Documentation Portal</title>
          <meta charset="utf-8" />
        </head>
        <body>
          <h1>Capstone Project Documentation Portal</h1>
          <p>Browse technical documentation PDFs: SRS, SDD, and UIDD.</p>
          <nav>
            <a href="/documents">View Documents</a>
          </nav>
        </body>
      </html>
    `);
  });

  // Documents list
  // filesystem discovery with JSON metadata
  router.get("/documents", (req, res) => {
    const pdfs = listPdfs();
    const meta = loadMetadata();

    const itemsHtml = pdfs.map((filename) => {
      const m = meta.get(filename) || { title: filename, description: "" };

      return `
          <li>
          <h3>${escapeHtml(m.title)}</h3>
          <p>${escapeHtml(m.description)}</p>
          <a href="/pdfs/${encodeURIComponent(filename)}">View / Download</a>
          <div style="font-size: 0.9em; opacity: 0.8;">File: ${escapeHtml(filename)}</div>
        </li>
      `;
    }).join("");

    res.status(200).send(`
      <html>
        <head>
          <title>Documents</title>
          <meta charset="utf-8" />
        </head>
        <body>
          <h1>Available Documents</h1>
          <ul style="list-style: none; padding-left: 0;">
            ${itemsHtml || "<li>No Pdfs found in the pdfs/ folder.</li>"}
          </ul>
          <p><a href="/">Back to Home</a></p>
        </body>
      </html>
    `);
  });

  // PDF Route
  // Serves a PDF file using sendFile() after validating request
  router.get("/pdfs/:filename", (req, res) => {
    const filename = req.params.filename;
    const fullPath = resolvePdfPath(filename);

    if (!fullPath) {
      return res.status(404).send("PDF not found");
    }

    return res.sendFile(fullPath);
  });

  // 404 for bad routes
  router.use((req, res) => {
    res.status(404).send("404 - Not Found");
  });

  return router;
}

module.exports = { buildRouter };
