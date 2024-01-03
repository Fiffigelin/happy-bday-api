// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const app = express();
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  return res.status(200).send("This is my node.js API! :)");
});
exports.app = functions.https.onRequest(app);
