const { createUser, getUserById } = require("../controllers/user.controller");
const userService = require("../services/user.service");

jest.mock("../services/user.service.js", () => ({
  createUser: jest.fn(),
  getUserById: jest.fn(),
}));

//---------------- CREATE USER -------------------------

describe("create user function", () => {
  it("should create a new user", async () => {
    const req = {
      params: { id: "UserId" },
      body: {
        name: "New User",
        profileURL: "new User",
        email: "new_user@mail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      getUserById: jest.fn(),
    };

    const createdUserWithID = { ...req, id: "UserId" };
    userService.createUser.mockResolvedValue(req);

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      msg: "Data Saved",
      user: req,
    });
    expect(typeof createdUserWithID.id).toBe("string");
  });
});

// ---------------- GET USER BY ID -------------------

describe("getUserById function", () => {
  it("should return user details", async () => {
    const req = {
      params: { id: "testUserId" },
    };

    const data = {
      params: { id: "UserId" },
      body: {
        name: "New User",
        profileURL: "new User",
        email: "new_user@mail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    userService.getUserById.mockResolvedValue(data);

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: data,
    });
  });
});
