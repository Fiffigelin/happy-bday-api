const { firestore } = require("../../firebase.config");

exports.createUser = async (name, profile_url, uid) => {
  try {
    const newDocRef = await firestore.collection("users").add({
      name,
      profile_url,
      uid,
    });

    const docId = newDocRef.id;

    await firestore.collection("users").doc(docId).update({ id: docId });

    return { status: "Success", msg: "Data Created" };
  } catch (error) {
    throw error;
  }
};

exports.getUserByUid = async (userUid) => {
  try {
    const reqDoc = firestore.collection("users").where("uid", "==", userUid);
    const userSnapshot = await reqDoc.get();

    if (!userSnapshot.empty) {
      const userDetail = userSnapshot.docs[0].data();
      console.log("FETCHED USER: ", userDetail);
      return userDetail;
    } else {
      return { status: "No data" };
    }
  } catch (error) {
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    const querySnapshot = await firestore.collection("users").get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        name: doc.data().name,
        profileURL:
          doc.data().profileURL === undefined ? "" : doc.data().profileURL,
        uid: doc.data().uid,
      };

      response.push(selectedItem);
    });

    return response;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userId, updatedData) => {
  try {
    const reqDoc = firestore.collection("users").doc(userId);
    await reqDoc.update(updatedData);

    const updatedUserDoc = await reqDoc.get();
    const updatedUser = updatedUserDoc.data();

    return { status: "Success", msg: "Data Updated", data: updatedUser };
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (userId) => {
  try {
    const reqDoc = firestore.collection("users").doc(userId);
    await reqDoc.delete();

    return { status: "Success", msg: "Data Removed" };
  } catch (error) {
    throw error;
  }
};
