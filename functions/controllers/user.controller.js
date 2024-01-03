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
