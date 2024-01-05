const fileService = require("../services/file.service");

exports.getFiles = async (req, res) => {
  try {
    const imageUrls = await fileService.getFilesFromStorage();
    res.status(200).json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
