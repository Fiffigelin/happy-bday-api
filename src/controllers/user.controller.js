const userService = require("../services/user.service");

exports.createUserController = async (req, res) => {
  try {
    const {
      name,
      profile_url = "https://i.imgur.com/tYUrCTX.png",
      uid,
    } = req.body;

    const createdUser = await userService.createUser(name, profile_url, uid);
    return res
      .status(200)
      .send({ status: "Success", msg: "Data Saved", user: createdUser });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getUserByUidController = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetail = await userService.getUserByUid(userId);

    return res.status(200).send({ status: "Success", data: userDetail });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

// admin
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
    };

    const result = await userService.updateUser(userId, updatedData);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.deleteUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ status: "Failed", msg: error });
  }
};
