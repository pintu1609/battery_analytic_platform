const kafka = require("kafka-node");
const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BROKER || "kafka:9092",
});
const producer = new kafka.Producer(client);

producer.on("ready", () => console.log("Kafka Producer Ready ✅"));
producer.on("error", (err) => console.error("Kafka Error ❌", err));

exports.sendMessage = (topic, message, email) => {
  const payload = {
    message: message,
    recipient: email || null,
  };

  producer.send([{ topic, messages: JSON.stringify(payload) }], (err, data) => {
    if (err) console.error("Send Error:", err);
    else console.log("Message Sent:", data);
  });
};
