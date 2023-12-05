const nanoId = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  // if (!body.url) return res.status(400).json({ error: "url is required" });
  if (!body.url)
    return res.render("home", {
      error: "No url entered",
    });
  const shortId = nanoId();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    shortId: shortId,
  });
  // return res.json({ id: shortId });
}
async function handleRedirectToRedirectedUrl(req, res) {
  const shortId = req.params.shortId;
  const data = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(data.redirectUrl);
}
async function handleGetUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  res.json({
    "total-clicks": entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortUrl,
  handleRedirectToRedirectedUrl,
  handleGetUrlAnalytics,
};
