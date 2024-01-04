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

exports.getAllUsers = async () => {
  try {
    const querySnapshot = await db.collection("users").get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        name: doc.data().name,
        profileURL: doc.data().profileURL,
        email: doc.data().email,
      };

      response.push(selectedItem);
    });

    console.log("RESPONS: ", response);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userId, updatedData) => {
  try {
    const reqDoc = db.collection("users").doc(userId);
    await reqDoc.update(updatedData);

    return { status: "Success", msg: "Data Updated" };
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    const reqDoc = db.collection("users").doc(userId);
    await reqDoc.delete();

    return { status: "Success", msg: "Data Removed" };
  } catch (error) {
    throw error;
  }
};
