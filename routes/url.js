const express = require("express");
const URL = require("../models/url");
const {
  handleGenerateNewShortUrl,
  handleRedirectToRedirectedUrl,
  handleGetUrlAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetUrlAnalytics);
router.get("/:shortId", handleRedirectToRedirectedUrl);
module.exports = router;
