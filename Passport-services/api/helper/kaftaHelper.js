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
  kafkaHost: process.env.KAFKA_BROKER || "localhost:9092"
});
const producer = new kafka.Producer(client);

producer.on('ready', () => console.log('Kafka Producer Ready ✅'));
producer.on('error', (err) => console.error('Kafka Error ❌', err));

exports.sendMessage = (topic, message) => {
  console.log("🚀 ~ topic:", topic)
  console.log("🚀 ~ message:", message)
  
  producer.send([{ topic, messages: JSON.stringify(message) }], (err, data) => {
    if (err) console.error('Send Error:', err);
    else console.log('Message Sent:', data);
  });
};
