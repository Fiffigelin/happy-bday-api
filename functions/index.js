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

const userRoutes = require("./routes/user.route");
const contactRoutes = require("./routes/contact.route");

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);

exports.app = functions.https.onRequest(app);
