const pushService = require("../services/pushnotification.service");
const pushController = require("../controllers/notification.controller");

//---------------- SEND NOTIFICATION -------------------------

describe("sendSampleNotification function", () => {
  it("should send a sample notification", async () => {
    const req = {
      body: {
        uid: "testUserId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    pushService.getTokenFromDB = jest.fn().mockResolvedValue("testToken");

    await pushController.sendSampleNotification(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Success");
  });

  it("should handle error when token is not found", async () => {
    const req = {
      body: {
        uid: "nonexistentUserId",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    pushService.getTokenFromDB = jest.fn().mockResolvedValue(null);

    await pushController.sendSampleNotification(req, res);

    expect(res.status).not.toHaveBeenCalled();
  });
});

//---------------- REGISTER TOKEN -------------------------

describe("registerPushToken function", () => {
  it("should register a push token", async () => {
    const req = {
      body: {
        uid: "testUserId",
        token: "testToken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    pushService.getTokenFromDB = jest
      .fn()
      .mockResolvedValue([{ token: "existingToken" }]);

    pushService.saveTokenToDB = jest.fn();

    await pushController.registerPushToken(req, res);

    expect(pushService.saveTokenToDB).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Success");
  });

  it("should not register a duplicate push token", async () => {
    const req = {
      body: {
        uid: "testUserId",
        token: "testToken",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    pushService.getTokenFromDB = jest
      .fn()
      .mockResolvedValue([{ token: "testToken" }]);

    pushService.saveTokenToDB = jest.fn();

    await pushController.registerPushToken(req, res);

    expect(pushService.saveTokenToDB).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Success");
  });
});
