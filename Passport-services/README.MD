## 🚀 Running Locally

1. Clone the repository

    git clone <repo-url>
    cd battery_analytic_backend

2. Create a .env file in the root

    PORT=5000
    DB_STRING=mongodb://localhost:27017
    DB_NAME=battery_analytic_platform
    ACCESS_TOKEN_PRIVATE_KEY=<YOUR_JWT_PRIVATE_KEY>
    REFRESH_TOKEN_PRIVATE_KEY=<YOUR_REFRESH_JWT_KEY>
    ACCESS_TOKEN_EXPIRY_DAY=30d
    KAFKA_BROKER=localhost:9092

3. Running Locally

    npm install
    npm run dev

Running with Docker

1. Build the Docker image
    docker build -t passport-service.

2. Run the container
    docker run -p 5000:5000 --env-file .env passport-service

3. Run with Docker Compose (MongoDB + Auth Service)
    docker-compose up --build

API Endpoints

| Method | Endpoint        | Auth  | Description           |
| ------ | --------------- | ----- | --------------------- |
| POST   | `/passport/`    | Admin | Create a new passport |
| GET    | `/passport/:id` | JWT   | Get passport by ID    |
| PUT    | `/passport/:id` | Admin | Update passport by ID |
| DELETE | `/passport/:id` | Admin | Delete passport by ID |


1. Request Example   Create Passport (POST /passport/)
  
Authorization: Bearer <JWT_TOKEN>

{
  "data": {
    "generalInformation": {
      "batteryIdentifier": "BAT12345",
      "batteryModel": {
        "id": "M123",
        "modelName": "Tesla 4680"
      },
      "batteryMass": 300,
      "batteryCategory": "EV",
      "batteryStatus": "Active",
      "manufacturingDate": "2024-06-15",
      "manufacturingPlace": "Berlin, Germany",
      "warrantyPeriod": "8 years",
      "manufacturerInformation": {
        "manufacturerName": "Tesla",
        "manufacturerIdentifier": "TES-01"
      }
    },
    "materialComposition": {
      "batteryChemistry": "Lithium-Ion",
      "criticalRawMaterials": ["Lithium", "Cobalt"],
      "hazardousSubstances": [
        {
          "substanceName": "Nickel",
          "chemicalFormula": "Ni",
          "casNumber": "7440-02-0"
        }
      ]
    },
    "carbonFootprint": {
      "totalCarbonFootprint": 120,
      "measurementUnit": "kgCO2",
      "methodology": "ISO-14064"
    }
  }
}

Response Example

    {
  "status": 200,
  "message": "Passport created successfully",
  "data": {
    "_id": "651234abcd...",
    "data": { ... },
    "createdAt": "2025-09-17T09:15:42.315Z"
  }
}


2. Request Example (GET /passport/:id)

    {
        "email": "user@example.com",
        "password": "mypassword"
    }

    Response Example

    {
        "status": 200,
        "message": "Passport fetched",
        "data": {
            "_id": "651234abcd...",
            "data": { ... },
            "createdAt": "2025-09-17T09:15:42.315Z"
        }
        }
    ## same for Update and Delete Passport

## Kafka Events

    When a passport is modified, the service publishes events:

    passport.created
    passport.updated
    passport.deleted

4. Roles & Auth

    Admin JWT → Required for create, update, delete
    Any Authenticated User → Can fetch passport details