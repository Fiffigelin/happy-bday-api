// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const express = require("express");
// const cors = require("cors");
const { app } = require("./firebase.config");
// const { serviceAccount } = require("./firebase.config");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const app = express();
// app.use(cors({ origin: true }));

const userRoutes = require("./routes/user.route");
const contactRoutes = require("./routes/contact.route");
const fileRoutes = require("./routes/file.route");

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/file", fileRoutes);

exports.app = functions.https.onRequest(app);
