const service = require("../../service//notifiction/notification");
const { sendEmail } = require("../../helper/sendemail");
const { useErrorHandler } = require("../../middleware/error-handler");
const {
  clientHandler,
  responseHandler,
} = require("../../middleware/response-handler");

exports.testNotification = async (req, res, next) => {
  try {
    const { eventType, message, recipient, status } = req.body;

    const notification = await service.createNotification({
      eventType,
      message,
      recipient,
    });
    console.log("🚀 ~ notification:", notification);

    const result = await sendEmail({
      receverEmail: recipient || "default@demo.com",
      subject: `Notification: ${eventType}`,
      desc: message,
    });

    // res.status(201).json({ success: true, data: notification });

    if (result.status !== 200 || notification.status !== 201)
      return clientHandler({}, res, result.message, result.status);

    const updatedNotification = await service.updateNotificationStatus(notification.data._id, "sent");

    return responseHandler(
      updatedNotification.data,
      res,
      notification.message,
      notification.status
    );

  } catch (err) {
    console.log("🚀 ~ err:", err)
    useErrorHandler(err, req, res);
    next(err);
  }
};

exports.getAllNotifications = async (req, res, next) => {
  try {
    const notifications = await service.getNotifications();
    if (notifications.status !== 200)
      return clientHandler(
        {},
        res,
        notifications.message,
        notifications.status
      );
    return responseHandler(notifications.data, res, notifications.message, 200);
  } catch (err) {
    useErrorHandler(err, req, res);
    next(err);
  }
};
