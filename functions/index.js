// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const { app } = require("./firebase.config");

const userRoutes = require("./routes/user.route");
const contactRoutes = require("./routes/contact.route");
const fileRoutes = require("./routes/file.route");
const imageRoutes = require("./routes/image.route");

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/image", imageRoutes);

exports.app = functions.https.onRequest(app);
