const { app } = require("./firebase.config");
const config = require("./config.js");
const cron = require("node-cron");
const cronJob = require("./cron.job.js");

const userRoutes = require("./src/routes/user.route.js");
const contactRoutes = require("./src/routes/contact.route.js");
const imageRoutes = require("./src/routes/image.route.js");
const notificationRoutes = require("./src/routes/pushnotification.route.js");

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/notifications", notificationRoutes);

// Scheduled to run function that fetches birthdays and the users tokens
// And activates the push-notifications
cron.schedule("0 12 * * *", () => {
  cronJob.runCronJob();
});

// For testing.
// Checks every minute
// cron.schedule("* * * * *", () => {
//   cronJob.runCronJob();
// });

app.listen(config.port, () =>
  console.log("App is listening on url " + config.url)
);
