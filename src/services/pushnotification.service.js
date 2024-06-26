const { firestore } = require("../../firebase.config");

exports.saveTokenToDB = async (uid, token) => {
  try {
    await firestore.collection("user_tokens").add({
      token: token,
      uid: uid,
    });
  } catch (error) {
    throw error;
  }
};

exports.getTokenFromDB = async (uid) => {
  const userTokensRef = firestore
    .collection("user_tokens")
    .where("uid", "==", uid);

  try {
    const snapshot = await userTokensRef.get();

    if (snapshot.empty) {
      return [];
    }

    const tokensArray = snapshot.docs.map((doc) => doc.data());
    return tokensArray;
  } catch (error) {
    throw error;
  }
};
