const { getUser } = require("../service/auth");

async function restrictToLoggedInUsersOnly(req, res, next) {
  const sessionId = req.cookies.uid;
  if (!sessionId) return res.redirect("/user/login");
  const user = getUser(sessionId);
  if (!user) return res.redirect("/user/login");
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const sessionId = req.cookies.uid;
  const user = getUser(sessionId);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedInUsersOnly, checkAuth };
