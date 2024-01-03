const admin = require("firebase-admin");
const db = admin.firestore();

exports.createUser = async (name, profileURL, email) => {
  try {
    const newDocRef = await db.collection("users").add({
      name,
      profileURL,
      email,
    });

    const docId = newDocRef.id;

    await db.collection("users").doc(docId).update({ id: docId });

    return { id: docId, name, profileURL, email };
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const reqDoc = db.collection("users").doc(userId);
    const userDetail = await reqDoc.get();
    const response = userDetail.data();

    return response || { status: "No data" };
  } catch (error) {
    throw error;
  }
};
