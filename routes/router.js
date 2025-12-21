// routes/router.js
// Handles the routes between pages

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

// Consistent page wrapper for all routes (nav + CSS + container)
function pageTemplate({ title, content }) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${escapeHtml(title)}</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <header class="nav">
          <div class="nav-inner">
            <div class="brand">Capstone Project Documentation Portal</div>
            <nav class="nav-links">
              <a class="btn" href="/">Home</a>
              <a class="btn" href="/documents">Documents</a>
            </nav>
          </div>
        </header>

        <main class="container">
          ${content}
        </main>
      </body>
    </html>
  `;
}

// Build the router
function buildRouter() {
  const router = express.Router();

  // Home page
  router.get("/", (req, res) => {
    const content = `
      <div class="hero">
        <h1>Documents</h1>
        <p>
          A collection of project documentation PDFs (SRS, SDD, and UIDD) served securely.
          Browse documents, read summaries, and download official versions.
        </p>
        <div style="margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a class="btn" href="/documents">Browse Documents</a>
        </div>
      </div>

      <div class="stack">
        
        <section class="card">
          <h2>Scope</h2>
          <p>
            This portal provides centralized access to formal software engineering artifacts produced
            during the capstone lifecycle. Each document captures a distinct level of abstraction,
            from requirements analysis to design decisions and interface specifications.
          </p>
        </section>
      
        <section class="card">
          <h2>V-Model Alignment</h2>
          <p>
            The documents provided align with the left side of the V-Model shape shown below.
            Each document supports traceablity and verification throughout later testing and 
            validation phases as we traverse up the right side of the V.
          </p>

          <div class="vmodel-wrapper">
            <img src="/images/v-model.webp"
                alt="V-Model software development lifecycle diagram" />
          </div>
        </section>

        <section class="card">
          <h2>Validation vs Verification</h2>
          <p>
            The documents listed in this portal are produced during the validation phases of the
            V-Model software development life cycle (SDLC). Validation addresses the question,
            <em>“Are we building the right product?”</em> As development progresses back up the right side
            of the V, the focus shifts to verification, which asks,
            <em>“Are we building the product right?”</em>
          </p>
        </section>
      </div>
    `;
    return res.status(200).send(pageTemplate({ title: "Home", content }));
  });

  // Documents list
  // filesystem discovery with JSON metadata
  router.get("/documents", (req, res) => {
    // Discover PDFs from the designated folder
    const pdfs = listPdfs();
    // Load metadata Map: filename -> { title, description }
    const meta = loadMetadata();

    // Build list items (one per discovered PDF)
    const itemsHtml = pdfs
      .map((filename) => {
        const m = meta.get(filename) || { title: filename, description: "" };

        return `
          <li class="item">
            <h3 class="item-title">${escapeHtml(m.title)}</h3>
            <p class="item-desc">${escapeHtml(m.description)}</p>

            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <a class="btn" href="/pdfs/${encodeURIComponent(filename)}">View / Download</a>
              <span class="meta">File: ${escapeHtml(filename)}</span>
            </div>
          </li>
        `;
      })
      .join("");

    // Page content (injected into the shared template)
    const content = `
      <div class="hero">
        <h1>Project Documents</h1>
        <p>
          View all the documents from Team Black's Fall 2025 Capstone project below.
        </p>
      </div>

      <div class="card" style="margin-top: 16px;">
        <ul class="list">
          ${itemsHtml || `<li class="item"><p class="item-desc">No PDFs found in the pdfs/ folder.</p></li>`}
        </ul>
      </div>
    `;

    return res.status(200).send(pageTemplate({ title: "Documents", content }));
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
