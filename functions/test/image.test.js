const {
  createImage,
  updateImage,
  getImageById,
  getImageByCategory,
  getImages,
  deleteImage,
} = require("../controllers/image.controller");
const imageService = require("../services/image.service");

jest.mock("../services/image.service", () => ({
  createImage: jest.fn(),
  updateImage: jest.fn(),
  getImageById: jest.fn(),
  getImagesByCategory: jest.fn(),
  getAllImages: jest.fn(),
  deleteImage: jest.fn(),
}));

//---------------- CREATE IMAGE -------------------------

describe("create image function", () => {
  it("should create a new image", async () => {
    const req = {
      params: { id: "ImageId" },
      body: {
        url: "a url",
        category: "Funny",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const createdImageWithID = { ...req, id: "ImageId" };
    imageService.createImage.mockResolvedValue(req);

    await createImage(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      msg: "Data Saved",
      image: req,
    });
    expect(typeof createdImageWithID.id).toBe("string");
  });
});

//-------------------- UPDATE IMAGE ----------------------

describe("update image function", () => {
  it("should update a image", async () => {
    const req = {
      params: { id: "ImageId" },
      body: {
        url: "new url",
        category: "Funny",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    imageService.updateImage.mockResolvedValue(req);

    await updateImage(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(req);
  });
});

// ---------------- GET IMAGE BY ID -------------------

describe("getImageById function", () => {
  it("should return image details", async () => {
    const req = {
      params: { id: "testImageId" },
    };

    const data = {
      params: { id: "ImageId" },
      body: {
        url: "a url",
        category: "Funny",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    imageService.getImageById.mockResolvedValue(data);

    await getImageById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: data,
    });
  });
});

// ---------------- GET IMAGES BY CATEGORY -------------------

describe("getImageByCategory function", () => {
  it("should return a list with images", async () => {
    const req = {
      params: { category: "Funny" },
    };

    const data = [
      {
        params: { category: "Funny" },
        body: {
          url: "a url",
          id: "ImageId1",
        },
      },
      {
        params: { category: "Scary" },
        body: {
          url: "a url",
          id: "ImageId2",
        },
      },
      {
        params: { category: "Funny" },
        body: {
          url: "a url",
          id: "ImageId3",
        },
      },
      {
        params: { category: "Cake" },
        body: {
          url: "a url",
          id: "ImageId4",
        },
      },
      {
        params: { category: "Funny" },
        body: {
          url: "a url",
          id: "ImageId5",
        },
      },
      {
        params: { category: "Funny" },
        body: {
          url: "a url",
          id: "ImageId6",
        },
      },
    ];

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    imageService.getImagesByCategory.mockResolvedValue(data);
    await getImageByCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();

    const sendArguments = res.send.mock.calls[0][0];
    expect(sendArguments).toHaveProperty("status", "Success");
    expect(sendArguments).toHaveProperty("data", data);
  });
});

// ------------------ GET IMAGES ---------------------

describe("get images function", () => {
  it("should return a list of images", async () => {
    const req = [
      {
        id: "ImageId1",
        url: "a url",
        category: "Funny",
      },
      {
        id: "ImageId2",
        url: "a url",
        category: "Funny",
      },
      {
        id: "ImageId3",
        url: "a url",
        category: "Funny",
      },
    ];

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // mock users
    imageService.getAllImages.mockResolvedValue(req);
    await getImages({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();

    const sendArguments = res.send.mock.calls[0][0];
    expect(sendArguments).toHaveProperty("status", "Success");
    expect(sendArguments).toHaveProperty("data", req);
  });
});

// --------------- DELETE IMAGE ------------------------

describe("delete image function", () => {
  it("should delete a image", async () => {
    const req = {
      params: { id: "testImageId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockDeleteResponse = { status: "Success", msg: "Data Removed" };

    imageService.deleteImage.mockResolvedValue(mockDeleteResponse);

    await deleteImage(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockDeleteResponse);
  });
});
