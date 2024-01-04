const userService = require("../services/user.service");

exports.createUser = async (req, res) => {
  try {
    const { name, profileURL, email } = req.body;
    const createdUser = await userService.createUser(name, profileURL, email);
    return res
      .status(200)
      .send({ status: "Success", msg: "Data Saved", user: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetail = await userService.getUserById(userId);

    return res.status(200).send({ status: "Success", data: userDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send({ status: "Success", data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = {
      name: req.body.name,
      profileURL: req.body.profileURL,
      email: req.body.email,
    };

    const result = await userService.updateUser(userId, updatedData);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Failed", msg: error });
  }
};
