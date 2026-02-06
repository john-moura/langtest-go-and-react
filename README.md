# LangTest

LangTest is a full-stack application with a Go backend and a Next.js (React) frontend, designed to manage and run language proficiency tests (currently focusing on TELC B1).

## Project Structure

```text
.
├── Back/          # Go backend service
├── front/         # Next.js frontend application
├── docker-compose.yml
└── README.md
```

---

## Local Development

The easiest way to run the project locally is using Docker and Docker Compose.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd LangTest
    ```

2.  **Start the stack**:
    ```bash
    docker-compose up --build
    ```

3.  **Access the services**:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API**: [http://localhost:8080](http://localhost:8080)
    - **Postgres DB**: `localhost:5432` (Username: `postgres`, Password: `root`, DB: `langtest`)

---

## Deployment to Google Cloud Run

To deploy the frontend and backend to Google Cloud Run, follow these steps:

### Prerequisites
- [Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/docs/install)
- A Google Cloud Project with billing enabled.
- Artifact Registry API and Cloud Run API enabled.

### 1. Backend Deployment

1.  **Build and push the backend image**:
    ```bash
    gcloud builds submit --tag gcr.io/[PROJECT_ID]/langtest-back ./Back
    ```

2.  **Deploy to Cloud Run**:
    ```bash
    gcloud run deploy langtest-back \
      --image gcr.io/[PROJECT_ID]/langtest-back \
      --platform managed \
      --region [REGION] \
      --allow-unauthenticated \
      --set-env-vars DATABASE_URL=[YOUR_CLOUD_SQL_URL]
    ```
    *Note: Note down the Service URL provided after deployment.*

### 2. Frontend Deployment

1.  **Build and push the frontend image**:
    Make sure to provide the backend URL as a build argument if it's used during the build process, or set it via environment variables.

    ```bash
    gcloud builds submit --tag gcr.io/[PROJECT_ID]/langtest-front ./front
    ```

2.  **Deploy to Cloud Run**:
    ```bash
    gcloud run deploy langtest-front \
      --image gcr.io/[PROJECT_ID]/langtest-front \
      --platform managed \
      --region [REGION] \
      --allow-unauthenticated \
      --set-env-vars NEXT_PUBLIC_API_URL=[YOUR_BACKEND_SERVICE_URL]
    ```

### 3. Database
For production, it is recommended to use **Google Cloud SQL (PostgreSQL)**.
- Create a Cloud SQL instance.
- Configure the backend service to connect to it using the `DATABASE_URL` or via Cloud SQL Auth Proxy.

---

## Technologies Used

- **Frontend**: Next.js, React, CoreUI, Tailwind CSS, Redux.
- **Backend**: Go (Golang), Gorm, PostgreSQL.
- **Infrastructure**: Docker, Docker Compose, Google Cloud Run.
