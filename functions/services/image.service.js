const { db } = require("../firebase.config");

exports.createImage = async (url, category) => {
  try {
    const newDocRef = await db.collection("images").add({
      url,
      category,
    });

    const docId = newDocRef.id;

    await db.collection("images").doc(docId).update({ id: docId });

    return { id: docId, url, category };
  } catch (error) {
    throw error;
  }
};

exports.getImageById = async (imageId) => {
  try {
    const reqDoc = db.collection("images").doc(imageId);
    const imageDetail = await reqDoc.get();
    const response = imageDetail.data();

    return response || { status: "No data" };
  } catch (error) {
    throw error;
  }
};

exports.getImagesByCategory = async (imageCategory) => {
  try {
    const imagesRef = db.collection("images");
    const querySnapshot = await imagesRef
      .where("category", "==", imageCategory)
      .get();

    const imagesList = [];
    querySnapshot.forEach((doc) => {
      imagesList.push(doc.data());
    });

    return imagesList;
  } catch (error) {
    throw error;
  }
};

exports.getAllImages = async () => {
  try {
    const querySnapshot = await db.collection("images").get();
    const response = [];

    querySnapshot.forEach((doc) => {
      const selectedItem = {
        id: doc.id,
        url: doc.data().url,
        category: doc.data().category,
      };

      response.push(selectedItem);
    });

    console.log("RESPONS: ", response);
    return response;
  } catch (error) {
    throw error;
  }
};

exports.updateImage = async (imageId, updatedData) => {
  try {
    const reqDoc = db.collection("images").doc(imageId);
    await reqDoc.update(updatedData);

    return { status: "Success", msg: "Data Updated" };
  } catch (error) {
    throw error;
  }
};

exports.deleteImage = async (imageId) => {
  try {
    const reqDoc = db.collection("images").doc(imageId);
    await reqDoc.delete();

    return { status: "Success", msg: "Data Removed" };
  } catch (error) {
    throw error;
  }
};
