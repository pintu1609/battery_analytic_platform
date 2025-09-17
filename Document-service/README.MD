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
    REFRESH_TOKEN_EXPIRY_DAY=7d
    AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY>
    AWS_BUCKET_NAME=batteryanalytic
    AWS_REGION=eu-north-1


3. Running Locally

    npm install
    npm run dev

Running with Docker

1. Build the Docker image
    ddocker run -p 5000:5000 --env-file .env document-service

2. Run the container
    docker run -p 5000:5000 --env-file .env document-service

3. Run with Docker Compose (MongoDB + DOCUMENT Service)
    docker-compose up --build

API Endpoints

    | Method | Endpoint           | Auth      | Description                      |
| ------ | ------------------ | --------- | -------------------------------- |
| POST   | `/document/`       | Admin JWT | Upload a document to S3 + DB     |
| GET    | `/document/:docId` | Admin JWT | Get signed download link for doc |
| PUT    | `/document/:docId` | Admin JWT | Update document metadata         |
| DELETE | `/document/:docId` | Admin JWT | Delete document from S3 + DB     |



1. Request Example (POST /document/)

Form Data

Key: file
Value: <choose a file>

header
Authorization: Bearer <JWT_TOKEN>


Response Example

    {
        "data": {
            "docId": "650f1bc0f1a7b6d9f8c1a2e5",
            "fileName": "report.pdf",
            "createdAt": "2025-09-17T09:00:00.000Z"
        },
        "message": "File uploaded successfully",
        "status": 200
        }

2. Request Example (GET /document/:docId)

    GET /document/650f1bc0f1a7b6d9f8c1a2e5
    Authorization: Bearer <JWT_TOKEN>

    Response Example

    {
        "data": {
            "docId": "650f1bc0f1a7b6d9f8c1a2e5",
            "fileName": "report.pdf",
            "createdAt": "2025-09-17T09:00:00.000Z",
            "link": "https://s3.amazonaws.com/batteryanalytic/uuid-report.pdf?X-Amz-Expires=300..."
        },
        "message": "Document found",
        "status": 200
        }


