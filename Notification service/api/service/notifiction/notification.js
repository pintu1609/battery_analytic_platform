const model = require("../../model/notification/notification");
const dal=require("../../helper/dal");


exports.createNotification = async (data) => {
  // const notification = new Notification(data);
  // return await notification.save();

  const notification = await dal.create(model, data);
  return { data: notification, message: "Notification created successfully", status: 201 };

};

exports.updateNotificationStatus = async (id, status) => {
  // return await Notification.findByIdAndUpdate(id, { status }, { new: true });

  const notification = await dal.findByID(model, id);
  if(!notification) return { status: 404, message: "Notification not found" };

  const updatedNotification = await dal.findOneAndUpdate(model, { _id: id }, { status });
  return { status: 200, message: "Notification updated", data: updatedNotification }; 
};

exports.getNotifications = async () => {
  // return await Notification.find().sort({ createdAt: -1 });
  const notifications = await dal.find(model);
  return {data:notifications, message:"Notifications fetched successfully", status:200};
};
