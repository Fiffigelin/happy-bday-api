const messageServive = require("../services/message.service");
console.log("user_id: ", user_id);
console.log("image_id: ", image_id);
console.log("message: ", message);

exports.createMessage = async (req, res) => {
  console.log("MESSAGECONTROLLER");
  try {
    const { user_id, image_id, message } = req.body;
    console.log("user_id: ", user_id);
    console.log("image_id: ", image_id);
    console.log("message: ", message);

    const createdMessage = await messageServive.createMessage(
      user_id,
      image_id,
      message
    );

    return res.status(200).send({
      status: "Success",
      msg: "Data Saved",
      message: createdMessage,
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
