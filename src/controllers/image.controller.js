const imageService = require("../services/image.service");

exports.createImageController = async (req, res) => {
  try {
    const { url, category } = req.body;
    const createdImage = await imageService.createImage(url, category);
    return res
      .status(200)
      .send({ status: "Success", msg: "Data Saved", image: createdImage });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getImageByIdController = async (req, res) => {
  try {
    const imageId = req.params.id;
    const imageDetail = await imageService.getImageById(imageId);

    return res.status(200).send({ status: "Success", data: imageDetail });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getImageByCategoryController = async (req, res) => {
  try {
    const category = req.params.category;
    const images = await imageService.getImagesByCategory(category);

    return res.status(200).send({ status: "Success", data: images });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getImagesController = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    return res.status(200).send({ status: "Success", data: images });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.updateImageController = async (req, res) => {
  try {
    const imageId = req.params.id;
    const updatedData = {
      url: req.body.url,
      category: req.body.category,
    };

    const result = await imageService.updateImage(imageId, updatedData);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.deleteImageController = async (req, res) => {
  try {
    const imageId = req.params.id;
    const result = await imageService.deleteImage(imageId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};
