1. Clone the repository

    git clone <repo-url>
    cd battery_analytic_backend

2. Create a .env file in the root

    PORT=5000
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.kqbqscz.mongodb.net/battery_analytic_platform
    JWT_SECRET=<ENTER_JWT_SECRET>
    DB_STRING=mongodb+srv://<username>:<password>@cluster0.kqbqscz.mongodb.net
    DB_NAME=battery_analytic_platform
    EMAIL_USER=resend@mail.factory.soluperts.com
    API_KEY=<YOUR_RESEND_API_KEY>
    ACCESS_TOKEN_PRIVATE_KEY=<YOUR_JWT_PRIVATE_KEY>
    ACCESS_TOKEN_EXPIRY_DAY=30d
    NODE_OPTIONS=--dns-result-order=ipv4first

3. Running Locally

    npm install
    npm run dev

Running with Docker

1. Build the Docker image
    docker build -t auth-service.

2. Run the container
    docker run -p 5000:5000 --env-file .env auth-service

3. Run with Docker Compose (MongoDB + Auth Service)
    docker-compose up --build

API Endpoints

        | Method | Endpoint         | Auth   | Description             |
    | ------ | ---------------- | ------ | ----------------------- |
    | POST   | `/auth/register` | Public | Register a new user     |
    | POST   | `/auth/login`    | Public | Login and get JWT token |


1. Request Example (POST /auth/register)

{
  "email": "user@example.com",
  "password": "mypassword",
  "role": "user"
}

Response Example

    {
        "status": 200,
        "message": "User registered successfully",
        "data": {
            "_id": "650f1bc0f1a7b6d9f8c1a2e5",
            "email": "user@example.com",
            "role": "user",
            "createdAt": "2025-09-17T08:00:00.000Z"
        }
        }

2. Request Example (POST /auth/login)

    {
        "email": "user@example.com",
        "password": "mypassword"
    }

    Response Example

    {
        "status": 200,
        "message": "User logged in successfully",
        "data": {
            "user": {
            "_id": "650f1bc0f1a7b6d9f8c1a2e5",
            "email": "user@example.com",
            "role": "user"
            },
            "token": "<JWT_ACCESS_TOKEN>"
        }
    }

3. JWT Authentication

    Authorization: Bearer <token>

If missing or invalid:

{
  "status": 401,
  "message": "No token provided"
}

