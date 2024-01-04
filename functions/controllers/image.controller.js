const imageService = require("../services/image.service");

exports.getImages = async (req, res) => {
  try {
    const imageUrls = await imageService.getImagesFromStorage();
    res.status(200).json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
