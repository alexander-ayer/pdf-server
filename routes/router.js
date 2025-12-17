// routes/router.js
const express = require("express");

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
  router.get("/documents", (req, res) => {
    res.status(200).send(`
      <html>
        <head>
          <title>Documents</title>
          <meta charset="utf-8" />
        </head>
        <body>
          <h1>Available Documents</h1>
          <p>Placeholder</p>
          <ul>
            <li><a href="/pdfs/example.pdf">(placeholder)</a></li>
          </ul>
          <p><a href="/">Back to Home</a></p>
        </body>
      </html>
    `);
  });

  // PDF Route
  router.get("/pdfs/:filename", (req, res) => {
    res.status(501).send("I haven't done this yet");
  });

  // 404
  router.use((req, res) => {
    res.status(404).send("404 - Not Found");
  });

  return router;
}

module.exports = { buildRouter };
