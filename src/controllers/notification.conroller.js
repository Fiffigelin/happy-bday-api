const pushService = require("../services/pushnotification.service");

exports.registerPushToken = async (req, res) => {
  const userId = String(req.body.userId);
  const token = String(req.body.token);
  await pushService.saveTokenToDB(userId, token);
  res.status(200).send("success");
};

exports.sendSampleNotification = async (_, res) => {
  const { token } = await pushService.getTokenFromDB(
    "jyFDuoNPyGXKFa7BUH4syxnQaaC2"
  );
  await pushService.sendPushNotification(
    token,
    "Soil Water Level too Low!",
    "Water your plants!"
  );
  res.status(200).send("Success");
};
