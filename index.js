const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const studentsRouter = require("./routes/studentsRouter");
const { logging } = require("./middlewares/logging");
const mongoose = require("mongoose");

// connect to DB
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb://admin:secret@localhost:27017/iti?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
  );
  console.log("DB connected...");
}
// create express app
const app = express();
// Middlewares
// 3rd party middlewares
app.use(helmet());
//
// Built-in middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static("public"));
//
// Custom middleware (Application-level middleware)
app.use(logging);
//
// Application settings for Template Engine
app.set("template engine", "ejs");
app.set("views", "views");

// Request body - cookies example
app.post("/cookie", (req, res) => {
  console.log(req.body);
  res.cookie("username", Buffer.from(req.body.fn).toString("base64"));
  res.cookie("userToken", 776327863276436, { httpOnly: true });
  res.send(`Thanks ${req.body.fn} ${req.body.ln} for signing in...`);
});
app.get("/cookie", (req, res) => {
  const result = {
    user: Buffer.from(req.cookies.username, "base64").toString(),
    token: req.cookies.userToken,
  };
  res.send({ result });
});

// Route Handler middlewares
app.use("/api/v1/students", studentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
