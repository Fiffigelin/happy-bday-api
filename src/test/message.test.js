const messageService = require("../services/message.service");
const messageController = require("../controllers/message.controller");

//---------------- CREATE MESSAGE -------------------------

describe("createMessageController function", () => {
  it("should create a new message", async () => {
    const req = {
      body: {
        user_id: "testUserId",
        image_id: "testImageId",
        message: "Test message",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockMsgId = "mockMsgId";
    const mockCreatedMessage = {
      id: mockMsgId,
      user_id: req.body.user_id,
      image_id: req.body.image_id,
      message: req.body.message,
    };

    messageService.createMessage = jest.fn().mockResolvedValue(mockMsgId);
    messageService.getMessageById = jest
      .fn()
      .mockResolvedValue(mockCreatedMessage);

    await messageController.createMessageController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      msg: "Data Saved",
      data: mockCreatedMessage,
    });
  });
});

//---------------- GET MESSAGE BY USER -------------------------

describe("getMessagesByUserController function", () => {
  it("should get messages by user id", async () => {
    const req = {
      params: { id: "testUserId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockMessages = [
      { id: "1", user_id: "testUserId", message: "Message 1" },
      { id: "2", user_id: "testUserId", message: "Message 2" },
    ];

    messageService.getAllMessagesFromUser = jest
      .fn()
      .mockResolvedValue(mockMessages);

    await messageController.getMessagesByUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: mockMessages,
    });
  });
});

//---------------- GET MESSAGE BY CONTACT -------------------------

describe("getMessageByContactController function", () => {
  it("should get message by contact id", async () => {
    const req = {
      params: { id: "testContactId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockMessage = {
      id: "testMessageId",
      user_id: "testUserId",
      message: "Test message",
    };

    messageService.getMessageFromContact = jest
      .fn()
      .mockResolvedValue(mockMessage);

    await messageController.getMessageByContactController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: mockMessage,
    });
  });
});

//---------------- GET MESSAGE BY MSG ID  -------------------------

describe("getMessageByIdController function", () => {
  it("should get message by message id", async () => {
    const req = {
      params: { id: "testMessageId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockMessage = {
      id: "testMessageId",
      user_id: "testUserId",
      message: "Test message",
    };

    messageService.getMessageById = jest.fn().mockResolvedValue(mockMessage);

    await messageController.getMessageByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: mockMessage,
    });
  });
});
