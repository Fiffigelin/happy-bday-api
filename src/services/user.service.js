const { firestore } = require("../../firebase.config");

exports.createUser = async (name, profileURL, email) => {
  try {
    const newDocRef = await firestore.collection("users").add({
      name,
      profileURL,
      email,
    });

    const docId = newDocRef.id;

    await firestore.collection("users").doc(docId).update({ id: docId });

    return { status: "Success", msg: "Data Created" };
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const reqDoc = firestore.collection("users").doc(userId);
    const userDetail = await reqDoc.get();
    const response = userDetail.data();

    return response || { status: "No data" };
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
