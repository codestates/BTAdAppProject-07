const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const accountRoute = require("./routes/account");
const nftRoute = require("./routes/nft");
const collectionRoute = require("./routes/nft");

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", accountRoute);
app.use("/api", nftRoute);
app.use("/api", collectionRoute);

app.listen(8080);
