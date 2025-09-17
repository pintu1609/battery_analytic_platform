1. Clone the repository:
   git clone <repo-url>
   cd battery_analytic_backend

2. Create a .env file in the root:
   PORT=5000
   DB_STRING=mongodb://localhost:27017
   DB_NAME=battery_analytic_platform
   EMAIL_USER=resend@mail.factory.soluperts.com
   API_KEY=<YOUR_RESEND_API_KEY>
   ACCESS_TOKEN_PRIVATE_KEY=<YOUR_JWT_PRIVATE_KEY>
   REFRESH_TOKEN_PRIVATE_KEY=<YOUR_REFRESH_JWT_KEY>

3. Running Locally
   npm install
   npm run dev

Running with Docker

1. Build the Docker image:
   docker build -t notification-service .

2. Run the container:
   docker run -p 5000:5000 --env-file .env notification-service

   Or use Docker Compose (with Kafka + MongoDB):

   docker-compose up --build

API Endpoints

| Method | Endpoint             | Auth      | Description                      |
| ------ | -------------------- | --------- | -------------------------------- |
| GET    | `/notification/`     | Admin JWT | Get all notifications            |
| POST   | `/notification/test` | JWT       | Create test notification + email |

Request Example (POST /notification/test)

{
"eventType": "BatteryLow",
"message": "Battery dropped below 20%",
"recipient": "admin@example.com"
}

Response Example

{
"data": {
"\_id": "64f8e...",
"eventType": "BatteryLow",
"message": "Battery dropped below 20%",
"recipient": "admin@example.com",
"status": "pending",
"createdAt": "2025-09-17T03:05:42.315Z"
},
"message": "Notification created successfully",
"status": 201
}

Kafka Events

1. The service consumes Kafka topics:

    passport.created

    passport.updated

    passport.deleted

2. Each event triggers:

    Notification creation in DB

    Email sent to admin@battery.com

    Notification status updated to sent
