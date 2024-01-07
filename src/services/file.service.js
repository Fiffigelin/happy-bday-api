// const { bucket } = require("../firebase.config");

// exports.getFilesFromStorage = async () => {
//   const storageRef = bucket;
//   const folderName = "test";

//   try {
//     const [files] = await storageRef.getFiles({ prefix: folderName });
//     const fileUrls = files.map((file) => {
//       return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
//     });
//     return fileUrls;
//   } catch (error) {
//     console.error("Error fetching files:", error);
//     throw new Error("Could not fetch images");
//   }
// };
