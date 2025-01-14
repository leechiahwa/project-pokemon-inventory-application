const express = require("express");
const app = express();
const router = require("./routes/router");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // for icons
app.use(express.json());
app.use("/", router);

app.listen("3000", () => {
  console.log("http://localhost:3000");
});
