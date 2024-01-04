const admin = require("firebase-admin");

exports.getImagesFromStorage = async () => {
  const bucket = admin.storage().bucket("happy-bday-2963f.appspot.com");
  const folderName = "test";

  return bucket
    .getFiles({ prefix: folderName })
    .then(([files]) => {
      const imageUrls = files.map((file) => {
        return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      });
      return imageUrls;
    })
    .catch((error) => {
      console.error("Error fetching images:", error);
      throw new Error("Could not fetch images");
    });
};
