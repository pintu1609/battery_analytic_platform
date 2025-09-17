const { Kafka } = require("kafkajs");
const service = require("../service/notifiction/notification");
const { sendEmail } = require("./sendemail");

const kafka = new Kafka({
  clientId: "notification-service",
  // brokers: [process.env.KAFKA_BROKER || "host.docker.internal:29092"],
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

exports.startKafkaConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "passport.created", fromBeginning: true });
  await consumer.subscribe({ topic: "passport.updated", fromBeginning: true });
  await consumer.subscribe({ topic: "passport.deleted", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic,partition, message}) => {
      console.log("🚀 ~ message:", message)
      const raw = message.value?.toString() ?? "";
        let payload = null;
        try {
          payload = raw ? JSON.parse(raw) : null;
          console.log("🚀 ~ payload:", payload)
        } catch (e) {
          console.error("JSON parse error:", e.message, "raw=", raw);
          return; // skip bad message
        }
        
      const notification = await service.createNotification({
        recipient: payload.recipient,
        eventType: topic,
        message: payload.message,
      });
      console.log("🚀 ~ notification:", notification)

      const result = await sendEmail({
        receverEmail: payload.recipient || "default@demo.com",
        subject: `Notification: ${topic}`,
        desc: payload.message,
      });

      await service.updateNotificationStatus(notification.data._id, "sent");
    },
  });
};
