const { firestore } = require("../../firebase.config");

exports.createContact = async (
  birthday,
  name,
  user_Id,
  short_birthday,
  message_id
) => {
  console.log("CONTACTSERVICE");
  console.log("ID: ", user_Id);
  console.log("NAME: ", name);
  console.log("Birthday: ", birthday);
  try {
    const newDocRef = await firestore.collection("contacts").add({
      name,
      user_Id,
      birthday,
      short_birthday,
      message_id,
    });

    const docId = newDocRef.id;

    await firestore.collection("contacts").doc(docId).update({ id: docId });

    return { status: "Success", msg: "Data Created" };
  } catch (error) {
    throw error;
  }
};

exports.getContactById = async (contactId) => {
  try {
    const reqDoc = firestore.collection("contacts").doc(contactId);
    const userDetail = await reqDoc.get();
    const response = userDetail.data();

    return response || { status: "No data" };
  } catch (error) {
    throw error;
  }
};

exports.getAllContacts = async () => {
  try {
    const querySnapshot = await firestore.collection("contacts").get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        name: doc.data().name,
        birthday: doc.data().birthday,
        timestamp: doc.data().timestamp,
        message_id: doc.data().message_id,
        short_birthday: doc.data().short_birthday,
      };

      response.push(selectedItem);
    });

    console.log("RESPONS: ", response);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.getAllContactsFromUser = async (userId) => {
  try {
    const querySnapshot = await firestore
      .collection("contacts")
      .where("user_Id", "==", userId)
      .get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        name: doc.data().name,
        birthday: doc.data().birthday,
        message_id: doc.data().message_id,
        short_birthday: doc.data().short_birthday,
      };
      console.log("Item: ", selectedItem);

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
    const reqDoc = firestore.collection("contacts").doc(contactId);
    await reqDoc.update(updatedData);

    return { status: "Success", msg: "Data Updated" };
  } catch (error) {
    throw error;
  }
};

exports.putMessageToContact = async (contacts, message_id) => {
  console.log("SERVICE: ", message_id);
  console.log("SERVICE CONTACTS: ", contacts);
  try {
    const batch = firestore.batch();

    contacts.forEach((contact) => {
      console.log(contact);
      const contactRef = firestore.collection("contacts").doc(contact);
      batch.update(contactRef, { message_id: message_id });
    });

    await batch.commit();

    return { status: "Success", msg: "Data Updated" };
  } catch (error) {
    throw error;
  }
};

exports.deleteContact = async (contactId) => {
  try {
    const reqDoc = firestore.collection("contacts").doc(contactId);
    await reqDoc.delete();

    return { status: "Success", msg: "Data Removed" };
  } catch (error) {
    throw error;
  }
};
