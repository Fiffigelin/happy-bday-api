const contactServer = require("../services/contact.service");

exports.createContact = async (req, res) => {
  console.log("CONTACTCONTROLLER");
  try {
    const { birthday, name, user_Id } = req.body;
    console.log("Birth: ", birthday);
    console.log("Name: ", name);
    console.log("Id: ", user_Id);

    const short_date = new Date(birthday);
    const month = short_date.getMonth() + 1;
    const day = short_date.getUTCDate();
    const short_birthday = `${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    const message_id = "";

    console.log("birthday:", birthday);
    console.log("short_date:", short_date);
    console.log("short_birthday:", short_birthday);

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

exports.getContactsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const contacts = await contactServer.getAllContacts(userId);
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

exports.putMessageToContact = async (req, res) => {
  try {
    const { contacts, message_id } = req.body;

    const result = await contactServer.putMessageToContact(
      contacts,
      message_id
    );
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
