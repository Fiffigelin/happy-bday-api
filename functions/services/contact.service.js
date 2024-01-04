const { db } = require("../firebase.config");

exports.createContact = async (name, birthday) => {
  try {
    const birthdayDate = new Date(birthday);
    console.log(birthdayDate);

    const timestamp = birthdayDate.getTime();

    const newDocRef = await db.collection("contacts").add({
      name,
      birthday,
      timestamp,
    });

    const docId = newDocRef.id;

    await db.collection("contacts").doc(docId).update({ id: docId });

    return { id: docId, name, birthday, timestamp };
  } catch (error) {
    throw error;
  }
};

exports.getContactById = async (contactId) => {
  try {
    const reqDoc = db.collection("contacts").doc(contactId);
    const userDetail = await reqDoc.get();
    const response = userDetail.data();

    return response || { status: "No data" };
  } catch (error) {
    throw error;
  }
};

exports.getAllContacts = async () => {
  try {
    const querySnapshot = await db.collection("contacts").get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        name: doc.data().name,
        birthday: doc.data().birthday,
        timestamp: doc.data().timestamp,
      };

      response.push(selectedItem);
    });

    console.log("RESPONS: ", response);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.updateContact = async (contactId, updatedData) => {
  try {
    const reqDoc = db.collection("contacts").doc(contactId);
    await reqDoc.update(updatedData);

    return { status: "Success", msg: "Data Updated" };
  } catch (error) {
    throw error;
  }
};

exports.deleteContact = async (contactId) => {
  try {
    const reqDoc = db.collection("contacts").doc(contactId);
    await reqDoc.delete();

    return { status: "Success", msg: "Data Removed" };
  } catch (error) {
    throw error;
  }
};
