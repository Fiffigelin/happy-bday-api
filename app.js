const { app } = require("./firebase.config");
const config = require("./config");
const cron = require("node-cron");
const cronJob = require("./cron.job");

const userRoutes = require("./src/routes/user.route");
const contactRoutes = require("./src/routes/contact.route");
const imageRoutes = require("./src/routes/image.route");

app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/image", imageRoutes);

cron.schedule("* * * * *", () => {
  cronJob.runCronJob();
});

app.listen(config.port, () =>
  console.log("App is listening on url " + config.url)
);
