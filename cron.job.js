const { firestore } = require("./firebase.config.js");
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Stockholm");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

const getContacts = async (todayString) => {
  const contactsSnapshot = await firestore
    .collection("contacts")
    .where("short_birthday", "==", todayString)
    .get();

  return contactsSnapshot.docs.map((doc) => doc.data());
};

const getUsers = async (uniqueUserIdsArray) => {
  const userSnapshot = await firestore
    .collection("users")
    .where("id", "in", uniqueUserIdsArray)
    .get();

  return userSnapshot.docs.map((doc) => doc.data());
};

const getDeviceTokens = async (userUids) => {
  const deviceTokenSnapshot = await firestore
    .collection("user_tokens")
    .where("uid", "in", userUids)
    .get();

  return deviceTokenSnapshot.docs.map((doc) => doc.data());
};

exports.runCronJob = async () => {
  try {
    const todayString = moment().format("MM-DD");
    const contacts = await getContacts(todayString);

    if (contacts.length > 0) {
      const uniqueIds = new Set(contacts.map((obj) => obj.user_Id));
      const uniqueUserIdsArray = [...uniqueIds];

      const users = await getUsers(uniqueUserIdsArray);
      const userUids = users.map((user) => user.uid);
      const deviceTokens = await getDeviceTokens(userUids);

      const pushNotifications = users.map((user) => {
        const userContacts = contacts.filter(
          (contact) => contact.user_Id === user.id
        );
        const userDevicesTokens = deviceTokens
          .filter((token) => token.uid === user.uid)
          .map((token) => token.token);

        const birthdayNotifications = userContacts.map((contact) => ({
          message: contact.message,
          birthday: contact.birthday,
          short_birthday: contact.short_birthday,
          user_Id: contact.user_Id,
          name: contact.name,
          id: contact.id,
        }));

        return {
          user_id: user.id,
          uid: user.uid,
          devicetoken: userDevicesTokens,
          birthdays: birthdayNotifications,
        };
      });

      console.log(JSON.stringify(pushNotifications, null, 2));
      sendPushNotifications(pushNotifications);
    }
  } catch (error) {
    console.error("Error checking birthdays:", error);
  }
};

const sendPushNotifications = async (notifications) => {
  const messages = [];

  for (const notification of notifications) {
    for (const token of notification.devicetoken) {
      if (!Expo.isExpoPushToken(token)) {
        console.error(`Invalid Expo push token: ${token}`);
        continue;
      }

      const numberOfContacts = notification.birthdays.length;

      let messageBody = "";
      if (numberOfContacts === 1) {
        messageBody = `It's ${notification.birthdays[0].name}'s birthday today! 🎉`;
      } else if (numberOfContacts > 1) {
        messageBody = `It's the birthday of ${numberOfContacts} contacts today! 🎉`;
      }

      messages.push({
        to: token,
        sound: "default",
        title: "Happy BDay",
        body: messageBody,
      });
    }
  }

  console.log("messages: ", messages);

  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    try {
      const receipts = await expo.sendPushNotificationsAsync(chunk);
      console.log("Push receipts:", receipts);
    } catch (error) {
      console.error("Error sending push notifications:", error);
    }
  }
};
