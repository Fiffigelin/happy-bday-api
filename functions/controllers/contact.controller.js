const contactServer = require("../services/contact.service");

exports.createContact = async (req, res) => {
  try {
    const { name, birthday } = req.body;
    const createdContact = await contactServer.createContact(name, birthday);
    return res
      .status(200)
      .send({ status: "Success", msg: "Data Saved", contact: createdContact });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contactDetail = await contactServer.getContactById(contactId);

    return res.status(200).send({ status: "Success", data: contactDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await contactServer.getAllContacts();
    return res.status(200).send({ status: "Success", data: contacts });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const timestamp = new Date(req.body.birthday);

    const updatedData = {
      name: req.body.name,
      birthday: req.body.birthday,
      timestamp: timestamp,
    };

    const result = await contactServer.updateContact(contactId, updatedData);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const result = await contactServer.deleteContact(contactId);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};
