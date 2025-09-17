// const kafka = require('kafka-node');
// const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
// const producer = new kafka.Producer(client);

// producer.on('ready', () => console.log('Kafka Producer Ready'));
// producer.on('error', (err) => console.error(err));

// exports.sendMessage = (topic, message) => {
//     producer.send([{ topic, messages: JSON.stringify(message) }], (err, data) => {
//         if (err) console.error(err);
//     });
// };


const kafka = require('kafka-node');
const client = new kafka.KafkaClient({
  // kafkaHost: process.env.KAFKA_BROKER || "host.docker.internal:29092"
    kafkaHost: process.env.KAFKA_BROKER || "kafka:9092"

});
const producer = new kafka.Producer(client);

producer.on('ready', () => console.log('Kafka Producer Ready ✅'));
producer.on('error', (err) => console.error('Kafka Error ❌', err));

exports.sendMessage = (topic, message,email) => {
  console.log("🚀 ~ email:", email)
  const payload = {
    message: message,                 // your existing fields (e.g. data, _id, etc.)
    recipient: email || null,   // or ⁠ email: ⁠ if you prefer
  };
  console.log("🚀 ~ payload:", payload)
  
  producer.send([{ topic, messages: JSON.stringify(payload) }], (err, data) => {
    if (err) console.error('Send Error:', err);
    else console.log('Message Sent:', data);
  });
};
