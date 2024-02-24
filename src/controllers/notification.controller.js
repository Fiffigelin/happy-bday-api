const pushService = require("../services/pushnotification.service");

// exports.registerPushToken = async (req, res) => {
//   const userId = String(req.body.userId);
//   const token = String(req.body.token);
//   await pushService.saveTokenToDB(userId, token);
//   res.status(200).send("success");
// };

exports.sendSampleNotification = async (req, res) => {
  const uid = String(req.body.uid);
  console.log("UID:", uid);
  await pushService.getTokenFromDB(uid);
  res.status(200).send("Success");
};

exports.registerPushToken = async (req, res) => {
  try {
    const uid = String(req.body.uid);
    const deviceToken = String(req.body.deviceToken);
    console.log("UID:", uid);
    console.log("Device Token:", deviceToken);

    const existingToken = await pushService.getTokenFromDB(uid);

    if (!existingToken || existingToken.token !== deviceToken) {
      await pushService.saveTokenToDB(uid, deviceToken);
      console.log("Device Token saved to DB.");
    } else {
      console.log("Device Token already exists in DB.");
    }

    res.status(200).send("Success");
  } catch (error) {
    console.error("Error sending sample notification:", error);
    res.status(500).send("Internal Server Error");
  }
};
