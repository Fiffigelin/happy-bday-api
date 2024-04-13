const contactServer = require("../services/contact.service");

exports.createContactController = async (req, res) => {
  try {
    const { birthday, name, user_Id } = req.body;
    const short_birthday = shortBirthday(birthday);
    const message_id = "";

    const createdContact = await contactServer.createContact(
      birthday,
      name,
      user_Id,
      short_birthday,
      message_id
    );

    return res
      .status(200)
      .send({ status: "Success", msg: "Data Saved", contact: createdContact });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getContactByIdController = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactDetail = await contactServer.getContactById(contactId);

    return res.status(200).send({ status: "Success", data: contactDetail });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getContactsController = async (req, res) => {
  try {
    const contacts = await contactServer.getAllContacts();
    return res.status(200).send({ status: "Success", data: contacts });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getContactsByUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const contacts = await contactServer.getAllContacts(userId);
    return res.status(200).send({ status: "Success", data: contacts });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.updateContactController = async (req, res) => {
  try {
    const contactId = req.params.id;
    const short_birthday = shortBirthday(req.body.birthday);

    const updatedData = {
      name: req.body.name,
      birthday: req.body.birthday,
      short_birthday: short_birthday,
    };

    const result = await contactServer.updateContact(contactId, updatedData);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.putMessageToContactController = async (req, res) => {
  try {
    const { contacts, message_id } = req.body;

    const result = await contactServer.putMessageToContact(
      contacts,
      message_id
    );
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.deleteContactController = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await contactServer.deleteContact(contactId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

const shortBirthday = (birthday) => {
  const date = new Date(birthday);
  const month = date.getMonth() + 1;
  const day = date.getUTCDate();
  const short_birthday = `${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return short_birthday;
};
