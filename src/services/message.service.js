const { firestore } = require("../../firebase.config");

exports.createMessage = async (user_id, image_id, message) => {
  console.log("MESSAGESERVICE");
  console.log("user_id: ", user_id);
  console.log("image_id: ", image_id);
  console.log("message: ", message);

  try {
    const newDocRef = await firestore.collection("messages").add({
      user_id: user_id,
      image_id: image_id,
      message: message,
    });

    const docId = newDocRef.id;

    await firestore.collection("messages").doc(docId).update({ id: docId });

    return { status: "Success", msg: "Data Created", docId: docId };
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
        user_id: doc.user_id,
        image_id: doc.image_id,
        message: doc.message,
      };

      response.push(selectedItem);
    });

    console.log("RESPONS: ", response);
    return response;
  } catch (error) {
    throw error;
  }
};
