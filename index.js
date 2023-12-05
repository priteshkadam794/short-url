const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const exp = require("constants");
const { restrictToLoggedInUsersOnly, checkAuth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
const port = 1000;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("mongodb connected")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/url", restrictToLoggedInUsersOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(port, () => console.log(`server started at port , ${port}`));
