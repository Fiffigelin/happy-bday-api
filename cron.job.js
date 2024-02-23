const cron = require("node-cron");
const notificationSender = require("./notification.sender");
const { firestore } = require("./firebase.config");
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Stockholm");

exports.runCronJob = async () => {
  console.debug("Jag kommer hit!");
  try {
    const todayString = moment().format("MM-DD");
    console.log(todayString);

    const contactsWithBirthdays = await firestore
      .collection("contacts")
      .where("short_birthday", "==", todayString)
      .get();

    const contactDocs = contactsWithBirthdays.docs;
    contactDocs.forEach((doc) => {
      const data = doc.data();
      console.log("Contact data:", data);
    });

    console.log("Antal födelsedagar: ", contactsWithBirthdays);
    if (!contactsWithBirthdays.empty) {
      notificationSender.sendNotifications();
    }
  } catch (error) {
    console.error("Error checking birthdays:", error);
  }
};
