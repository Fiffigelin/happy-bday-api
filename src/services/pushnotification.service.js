const { firestore } = require("../../firebase.config"); // Anpassa sökvägen efter din konfiguration
const { Expo } = require("expo-server-sdk");

exports.saveTokenToDB = async (uid, token) => {
  try {
    await firestore.collection("user_tokens").add({
      token: token,
      uid: uid,
    });
  } catch (error) {
    console.error("Error saving token to Firestore:", error);
  }
};

// Denna funkar inte som den ska, den returnerar inte en token
// Måste fixas asap!
exports.getTokenFromDB = async (uid) => {
  console.log("GET TOKEN | uid: ", uid);
  const userTokensRef = firestore
    .collection("user_tokens")
    .where("uid", "==", uid);
  console.log(userTokensRef);

  try {
    const doc = await userTokensRef.get();
    if (doc.empty) {
      console.log("No matching documents");
      return null;
    }

    console.log("GET TOKEN | doc: ", doc.data);
    return doc.data;
  } catch (error) {
    console.error("Error getting token from Firestore:", error);
    return {};
  }
};
