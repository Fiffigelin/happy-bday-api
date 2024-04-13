const userService = require("../services/user.service");
const userController = require("../controllers/user.controller");

//---------------- CREATE USER -------------------------

describe("create user function", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        name: "New User",
        profileURL: "new User",
        uid: "testUserId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    userService.createUser = jest.fn().mockResolvedValue({
      status: "Success",
      msg: "Data Created",
    });

    await userController.createUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      msg: "Data Saved",
      status: "Success",
      user: {
        msg: "Data Created",
        status: "Success",
      },
    });
  });
});

//-------------------- UPDATE USER ----------------------

describe("updateUserController function", () => {
  it("should update a user", async () => {
    const req = {
      params: { id: "UserId" },
      body: {
        name: "Updated User",
        email: "new_user@mail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    userService.updateUser = jest.fn().mockResolvedValue({
      status: "Success",
      msg: "Data Updated",
      data: req.body,
    });

    await userController.updateUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      msg: "Data Updated",
      data: req.body,
    });
  });
});

// ---------------- GET USER BY ID -------------------

describe("getUserByUidController function", () => {
  it("should return user details", async () => {
    const req = {
      params: { id: "testUserId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const userData = {
      name: "New User",
      profileURL: "new User",
      email: "new_user@mail.com",
    };
    userService.getUserByUid = jest.fn().mockResolvedValue(userData);

    await userController.getUserByUidController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: userData,
    });
  });
});

// --------------- DELETE USER ------------------------

describe("deleteUserController function", () => {
  it("should delete a user", async () => {
    const req = {
      params: { id: "testUserId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockDeleteResponse = { status: "Success", msg: "Data Removed" };
    userService.deleteUser = jest.fn().mockResolvedValue(mockDeleteResponse);

    await userController.deleteUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockDeleteResponse);
  });
});
