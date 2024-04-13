const { firestore } = require("../../firebase.config");

exports.createMessage = async (user_id, image_id, message) => {
  try {
    const newDocRef = await firestore.collection("messages").add({
      user_id: user_id,
      image_id: image_id,
      message: message,
    });

    const doc_id = newDocRef.id;

    await newDocRef.update({ id: doc_id });
    return doc_id;
  } catch (error) {
    throw error;
  }
};

exports.getAllMessagesFromUser = async (user_id) => {
  try {
    const querySnapshot = await firestore
      .collection("messages")
      .where("user_id", "==", user_id)
      .get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        image_id: doc.data().image_id,
        message: doc.data().message,
        user_id: doc.data().user_id,
      };

      response.push(selectedItem);
    });

    return response;
  } catch (error) {
    throw error;
  }
};

exports.getMessageFromContact = async (contact_message) => {
  try {
    const reqDoc = firestore.collection("messages").doc(contact_message);
    const messageDetail = await reqDoc.get();
    const response = messageDetail.data();

    return response || { status: "No data" };
  } catch (error) {
    throw error;
  }
};

exports.getMessageById = async (doc_id) => {
  try {
    const reqDoc = firestore.collection("messages").doc(doc_id);
    const message = await reqDoc.get();
    const response = {
      id: message.data().id,
      imageId: message.data().image_id,
      message: message.data().message,
    };

    return response;
  } catch (error) {
    throw error;
  }
};
