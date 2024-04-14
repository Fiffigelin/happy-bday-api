const pushService = require("../services/pushnotification.service");

exports.sendSampleNotification = async (req, res) => {
  try {
    const uid = String(req.body.uid);
    const token = await pushService.getTokenFromDB(uid);
    if (token) {
      res.status(200).send("Success");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error ", error);
  }
};

exports.registerPushToken = async (req, res) => {
  try {
    const { uid, token } = req.body;
    const existingToken = await pushService.getTokenFromDB(uid);

    const isTokenUnique = existingToken.every(
      (object) => object.token !== token
    );

    if (isTokenUnique) {
      await pushService.saveTokenToDB(uid, token);
    }

    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send("Internal Server Error ", error);
  }
};
