const {
  createUser,
  updateUser,
  getUserById,
  getUsers,
  deleteUser,
} = require("../controllers/user.controller");
const userService = require("../services/user.service");

jest.mock("../services/user.service", () => ({
  createUser: jest.fn(),
  updateUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUsers: jest.fn(),
  deleteUser: jest.fn(),
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

//-------------------- UPDATE USER ----------------------

describe("updateUser function", () => {
  it("should update a user", async () => {
    const req = {
      params: { id: "UserId" },
      body: {
        name: "Updated User",
        profileURL: "new User",
        email: "new_user@mail.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    userService.updateUser.mockResolvedValue(req);

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(req);
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

// ------------------ GET USERS ---------------------

describe("get users function", () => {
  it("should return a list of users", async () => {
    const req = [
      {
        id: "1",
        name: "User 1",
        profileURL: "",
        email: "user1@example.com",
      },
      {
        id: "2",
        name: "User 2",
        profileURL: "",
        email: "user2@example.com",
      },
      {
        id: "3",
        name: "User 3",
        profileURL: "",
        email: "user3@example.com",
      },
    ];

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // mock users
    userService.getAllUsers.mockResolvedValue(req);
    await getUsers({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();

    const sendArguments = res.send.mock.calls[0][0];
    expect(sendArguments).toHaveProperty("status", "Success");
    expect(sendArguments).toHaveProperty("data", req);
  });
});

// --------------- DELETE USER ------------------------

describe("delete user function", () => {
  it("should delete a user", async () => {
    const req = {
      params: { id: "testUserId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockDeleteResponse = { status: "Success", msg: "Data Removed" };

    userService.deleteUser.mockResolvedValue(mockDeleteResponse);

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockDeleteResponse);
  });
});
