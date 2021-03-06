const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const { notFound, errorHandler } = require("./middleware/error");

const cors = require("cors");
require("dotenv").config();

const db = process.env.DB_CONNECT;
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

const products = require("./api/routes/products");

app.use("/api/products", products);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
console.log(db);
mongoose.connect(
  db,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongo Db Connected");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("The Server has starte on: " + PORT));
