const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "happy-bday-2963f.appspot.com",
});

const app = express();
const storage = admin.storage();

exports.app = app.use(cors({ origin: true }));
exports.db = admin.firestore();
exports.bucket = storage.bucket();