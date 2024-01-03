## SETUP

- firebase init
  installs firebase functions, created a firestore and storage beforehand.

  var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
credential: admin.credential.cert(serviceAccount)
});
