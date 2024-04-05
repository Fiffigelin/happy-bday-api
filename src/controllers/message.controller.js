const messageServive = require("../services/message.service");

exports.createMessage = async (req, res) => {
  console.log("MESSAGECONTROLLER");
  try {
    const { user_id, image_id, message } = req.body;
    console.log("user_id: ", user_id);
    console.log("image_id: ", image_id);
    console.log("message: ", message);

    const msg_id = await messageServive.createMessage(
      user_id,
      image_id,
      message
    );

    const createdMessage = await messageServive.getMessageById(msg_id);

    return res.status(200).send({
      status: "Success",
      msg: "Data Saved",
      data: createdMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getMessagesByUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const messages = await messageServive.getAllMessagesFromUser(user_id);

    return res.status(200).send({ status: "Success", data: messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getMessageByContact = async (req, res) => {
  try {
    const contact_message = req.params.id;
    const message = await messageServive.getMessageFromContact(contact_message);

    return res.status(200).send({ status: "Success", data: message });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message_id = req.params.id;
    const message_detail = await messageServive.getMessageById(message_id);

    return res.status(200).send({ status: "Success", data: message_detail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};
