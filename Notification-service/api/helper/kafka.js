const { Kafka } = require("kafkajs");
const service = require("../service/notifiction/notification");
const { sendEmail } = require("./sendemail");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

exports.startKafkaConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({ topic: "passport.created", fromBeginning: true });
  await consumer.subscribe({ topic: "passport.updated", fromBeginning: true });
  await consumer.subscribe({ topic: "passport.deleted", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const msg = message.value.toString();
      console.log(`📩 Received Kafka Event [${topic}] :`, msg);

      const notification = await service.createNotification({
        eventType: topic,
        message: msg,
      });

      await sendEmail("admin@battery.com", `New Event: ${topic}`, msg);

      await service.updateNotificationStatus(notification._id, "sent");
    },
  });
};
