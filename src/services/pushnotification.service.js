const { firestore } = require("../../firebase.config"); // Anpassa sökvägen efter din konfiguration
const { Expo } = require("expo-server-sdk");

// Skapa en ny Expo-instans
const expo = new Expo();

exports.saveTokenToDB = async (userId, token) => {
  const userTokensRef = firestore.collection("user_tokens").doc(userId);

  try {
    const doc = await userTokensRef.get();
    const values = doc.exists ? doc.data() : {};

    const payload = {
      ...values,
      token,
    };

    await userTokensRef.set(payload);
  } catch (error) {
    console.error("Error saving token to Firestore:", error);
  }
};

exports.getTokenFromDB = async (userId) => {
  const userTokensRef = firestore.collection("user_tokens").doc(userId);

  try {
    const doc = await userTokensRef.get();
    const values = doc.exists ? doc.data() : {};
    return values;
  } catch (error) {
    console.error("Error getting token from Firestore:", error);
    return {};
  }
};

exports.sendPushNotification = async (token, title, body) => {
  try {
    await expo.sendPushNotificationsAsync([
      {
        to: token,
        title: title,
        body: body,
      },
    ]);
  } catch (error) {
    console.error("Error sending push notification:", error);
    throw error;
  }
};
