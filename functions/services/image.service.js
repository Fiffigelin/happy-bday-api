const { bucket } = require("../firebase.config");

exports.getImagesFromStorage = async () => {
  const storageRef = bucket;
  const folderName = "test";

  try {
    const [files] = await storageRef.getFiles({ prefix: folderName });
    const imageUrls = files.map((file) => {
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });
    return imageUrls;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Could not fetch images");
  }
};
