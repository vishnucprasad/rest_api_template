"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const NotFoundError = require("./errors/notfound.error");
const apiRouter = require("./routes/index");

function getApp(database) {
  const app = express();

  // Connect to the database
  database.connect();

  // Enable CORS for all routes
  app.use(cors());

  // Parse request bodies as JSON
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Parse cookies as JSON
  app.use(cookieParser());

  // Set up routes
  app.use("/api", apiRouter);

  // Send not found error for all unmatched routes
  app.all("*", (req, res, next) => {
    next(new NotFoundError("Requested URL not found"));
  });

  // Error handler
  app.use((error, req, res, next) => {
    res.status(error.status || 500).json(error);
  });

  return app;
}

module.exports = getApp;
