const USER = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await USER.create({
    name,
    email,
    password,
  });

  res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });
  if (!user) {
    res.redirect("/user/login");
  } else {
    //const id = uuidv4(); // this setup is only required for statefull authentication

    const token = setUser(user);
    res.cookie("uid", token);
    res.redirect("/");
  }
}
module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
