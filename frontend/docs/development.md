# Development Environment Guide

This guide provides instructions for setting up the development environment for the Resume Builder Monorepo project.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14 or later)
- npm (version 6 or later)
- Docker (for containerization)
- PostgreSQL (for the database)

## Setting Up the Frontend

1. **Clone the repository**:
   ```sh
   git clone https://github.com/sisovin/resume-builder-monorepo.git
   cd resume-builder-monorepo
   ```

2. **Navigate to the frontend directory**:
   ```sh
   cd frontend
   ```

3. **Install dependencies**:
   ```sh
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env.local` file in the `frontend` directory and add the following environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

5. **Run the development server**:
   ```sh
   npm run dev
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Setting Up the Backend

1. **Navigate to the backend directory**:
   ```sh
   cd backend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the database migrations**:
   ```sh
   npx prisma migrate dev
   ```

5. **Seed the database**:
   ```sh
   npx ts-node prisma/seed.ts
   ```

6. **Run the backend server**:
   ```sh
   npm run start:dev
   ```

7. **Access the API**:
   The backend server will be running at `http://localhost:3000`.

## Running Tests

### Frontend Tests

1. **Navigate to the frontend directory**:
   ```sh
   cd frontend
   ```

2. **Run the component tests**:
   ```sh
   npm run test:components
   ```

3. **Run the end-to-end tests**:
   ```sh
   npm run test:e2e
   ```

### Backend Tests

1. **Navigate to the backend directory**:
   ```sh
   cd backend
   ```

2. **Run the unit tests**:
   ```sh
   npm run test
   ```

## Docker Setup

1. **Build the Docker image**:
   ```sh
   docker build -t resume-builder .
   ```

2. **Run the Docker container**:
   ```sh
   docker run -p 3000:3000 resume-builder
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Monitoring and Logging

1. **Set up Sentry for error tracking**:
   Add the following environment variables to your `.env.local` file:
   ```env
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
   ```

2. **Set up OpenTelemetry for observability**:
   Add the following environment variables to your `.env.local` file:
   ```env
   OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
   ```

## Conclusion

This guide provides the necessary steps to set up the development environment for the Resume Builder Monorepo project. Follow these instructions to get started with the frontend and backend development, run tests, and set up Docker for containerization. Additionally, configure monitoring and logging for better observability and error tracking.
