const pushService = require("../services/pushnotification.service");

exports.sendSampleNotification = async (req, res) => {
  try {
    const uid = String(req.body.uid);
    const token = await pushService.getTokenFromDB(uid);
    if (token) {
      res.status(200).send("Success");
    } else {
      console.log("Something went wrong");
    }
  } catch (error) {
    console.error("Error sending sample notification:", error);
    res.status(500).send("Internal Server Error");
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
    } else {
      console.log("Device Token already exists in DB.");
    }
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error sending sample notification:", error);
    res.status(500).send("Internal Server Error");
  }
};
