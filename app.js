var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const flash = require("connect-flash");
const cors = require("cors");
// import mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://athallahzaidandev:Idan123@cluster0.njiqqzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const port = process.env.PORT || 8000;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var responseRouter = require("./routes/response");
var trackerRouter = require("./routes/tracker");

var app = express();
app.options("*", cors()); // Enable pre-flight requests for all routes

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(logger("dev"));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/response", responseRouter);
app.use("/tracker", trackerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, function () {
  console.log("info", "Server is running at port : " + port);
});

module.exports = app;
