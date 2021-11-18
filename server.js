"use strict";

const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");
var flash = require('connect-flash');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    key: "user_email",
    secret: "SaloniSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_email && !req.session.user) {
    res.clearCookie("user_email");
  }
  next();
});

var sessionChecker = (req, res, next) => {
  if (req.session.user_email && req.cookies.user) {
    res.redirect("/");
  } else {
    next();
  }
};

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
// app.use(
//   express.urlencoded({
//     extended: false
//   })
// );
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.get("/product", homeController.showProducts);
app.get("/about", homeController.about);
app.get("/contact_us", homeController.contact);
app.get("/registration", homeController.registration);
app.post("/register_user", homeController.register_user);
app.get("/check-email", homeController.check_email);
app.get("/login", homeController.login);
app.get("/loginPOST", homeController.loginUser);
app.get("/logout", homeController.logout);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});