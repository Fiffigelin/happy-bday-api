const contactController = require("../controllers/contact.controller");
const contactService = require("../services/contact.service");

jest.mock("../services/contact.service", () => ({
  createContact: jest.fn(),
  updateContact: jest.fn(),
  getContactById: jest.fn(),
  getAllContacts: jest.fn(),
  deleteContact: jest.fn(),
}));

//---------------- CREATE CONTACT -------------------------

describe("create contact function", () => {
  it("should create a new contact", async () => {
    const birthday = new Date("2013-10-09");
    const timestamp = birthday.getTime();

    const req = {
      params: { id: "ContactId" },
      body: {
        name: "New Contact",
        birthday: birthday,
        timestamp: timestamp,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const createdContactWithID = { ...req, id: "ContactId" };
    contactService.createContact.mockResolvedValue(req);

    await contactController.createContactController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      msg: "Data Saved",
      contact: req,
    });
    expect(typeof createdContactWithID.id).toBe("string");
    expect(req.body.timestamp).toBe(1381276800000);
  });
});

// -------------------- UPDATE CONTACT ----------------------

describe("update contact function", () => {
  it("should update a contact", async () => {
    const birthday = new Date("2015-05-05");
    const timestamp = birthday.getTime();

    const req = {
      params: { id: "ContactId" },
      body: {
        name: "Updated Contact",
        birthday: birthday,
        timestamp: timestamp,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    contactService.updateContact.mockResolvedValue(req);

    await contactController.updateContactController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(req);
    expect(req.body.timestamp).toBe(1430784000000);
  });
});

// ---------------- GET CONTACT BY ID -------------------

describe("get contact by id function", () => {
  it("should return contact details", async () => {
    const birthday = new Date("2008-10-25");
    const timestamp = birthday.getTime();

    const req = {
      params: { id: "testContactId" },
    };

    const data = {
      params: { id: "ContactId" },
      body: {
        name: "New Contact",
        birthday: birthday,
        timestamp: timestamp,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    contactService.getContactById.mockResolvedValue(data);

    await contactController.getContactByIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "Success",
      data: data,
    });
    expect(data.body.timestamp).toBe(1224892800000);
  });
});

// ------------------ GET CONTACTS ---------------------

describe("get contacts function", () => {
  it("should return a list of contacts", async () => {
    const birthday1 = new Date("2022-12-03");
    const timestamp1 = birthday1.getTime();

    const birthday2 = new Date("2023-03-06");
    const timestamp2 = birthday2.getTime();

    const birthday3 = new Date("2007-03-12");
    const timestamp3 = birthday3.getTime();

    const req = [
      {
        id: "1",
        name: "Contact 1",
        birthday: birthday1,
        timestamp: timestamp1,
      },
      {
        id: "2",
        name: "Contact 2",
        birthday: birthday2,
        timestamp: timestamp2,
      },
      {
        id: "3",
        name: "Contact 3",
        birthday: birthday3,
        timestamp: timestamp3,
      },
    ];

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // mock contacts
    contactService.getAllContacts.mockResolvedValue(req);
    await contactController.getContactsController({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();

    const sendArguments = res.send.mock.calls[0][0];
    expect(sendArguments).toHaveProperty("status", "Success");
    expect(sendArguments).toHaveProperty("data", req);

    sendArguments.data.forEach((contact, index) => {
      expect(contact.timestamp).toEqual(req[index].timestamp);
    });
  });
});

// --------------- DELETE USER ------------------------

describe("delete contact function", () => {
  it("should delete a contact", async () => {
    const req = {
      params: { id: "testContactId" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockDeleteResponse = { status: "Success", msg: "Data Removed" };

    contactService.deleteContact.mockResolvedValue(mockDeleteResponse);

    await contactController.deleteContactController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockDeleteResponse);
  });
});
