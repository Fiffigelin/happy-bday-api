const cron = require("node-cron");
const notificationSender = require("./notification.sender");
const { firestore } = require("./firebase.config");
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Stockholm");

exports.runCronJob = async () => {
  console.debug("Jag kommer hit!");
  try {
    const todayString = moment().format("MM-DD");

    const contactsWithBirthdays = await firestore
      .collection("contacts")
      .where("birthdate", "==", todayString)
      .get();

    console.log("Antal födelsedagar: ", contactsWithBirthdays);
    if (!contactsWithBirthdays.empty) {
      notificationSender.sendNotifications();
    }
  } catch (error) {
    console.error("Error checking birthdays:", error);
  }
};
