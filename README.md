# Battery Analytics Platform

This repository contains a microservices-based Battery Analytics Platform, built with Node.js, MongoDB, Kafka, and Docker Compose.

# The project is structured into 4 services:

        Auth Service – Handles authentication, user management, and JWT tokens.

        Document Service – Manages documents, including file uploads to AWS S3.

        Notification Service – Sends email notifications and listens to Kafka topics.

        Passport Service – Handles passport-related data and communicates via Kafka.

## File Structure

backend/
│── Auth-service/
│   ├── api/
│   │   ├── controller/
│   │   ├── helper/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── route/
│   │   ├── service/
│   │   └── validation/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
│── Document-service/
├── api/
│   │   ├── controller/
│   │   ├── helper/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── route/
│   │   ├── service/
│   │   └── validation/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
│── Notification-service/
├── api/
│   │   ├── controller/
│   │   ├── helper/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── route/
│   │   ├── service/
│   │   └── validation/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
│── Passport-service/
├── api/
│   │   ├── controller/
│   │   ├── helper/
│   │   ├── middleware/
│   │   ├── model/
│   │   ├── route/
│   │   ├── service/
│   │   └── validation/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
│── docker-compose.yml
│── README.md
│── .env.sample

# Environment Setup
Root directory has a .env.sample file. To configure the project:

1. Copy the .env.sample to .env in the root directory:

    cp .env.sample .env


2. Open the .env files and fill in your credentials:

    MongoDB URI

    JWT secrets

    AWS credentials (for Document Service)

    Kafka broker

    Email API credentials (for Notification Service)

# Note: .env.sample is safe to commit. Do not commit .env files with real secrets.

# Running with Docker
Make sure you have Docker and Docker Compose installed.

1. Start all services:

    docker-compose up -d --build

2. Check running containers:

    docker ps

3. Stop services:

    docker compose down 

# The following services will be running:

    MongoDB → localhost:27017

    Zookeeper → localhost:2181

    Kafka → localhost:9092

    Auth Service → localhost:5000

    Document Service → localhost:5001

    Notification Service → localhost:5002

    Passport Service → localhost:5004

# Service Communication
All services use the same MongoDB database (battery_analytic_platform).

Kafka Topics

| Topic Name          | Producer Service | Consumer Service     | Purpose                            |
| ------------------- | ---------------- | -------------------- | ---------------------------------- |
| `passport.created`  | Passport Service | Notification Service | Notify when a passport is created  |
| `passport.deleted`  | Passport Service | Notification Service | Notify when a passport is deleted  |
| `document.uploaded` | Document Service | Notification Service | Notify when a document is uploaded |

The Notification Service listens to these Kafka topics and sends emails via the configured email provider.

# Development Notes

Each service is fully independent and can be developed/tested separately.

Shared communication happens via MongoDB and Kafka.

Add new topics to Kafka easily by extending producers/consumers.