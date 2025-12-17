// server.js
const express = require("express");
const { buildRouter } = require("./routes/router");

const app = express();

// Basic middleware
app.use(express.urlencoded({ extended: true }));

// ROuting module
app.use("/", buildRouter());

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
