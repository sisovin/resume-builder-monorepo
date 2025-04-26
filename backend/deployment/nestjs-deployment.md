# NestJS Server Deployment Setup

This document outlines the steps to deploy the NestJS server for the Resume Builder application.

## Prerequisites

- Docker installed on the deployment server
- Docker Compose installed on the deployment server
- Environment variables configured

## Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sisovin/resume-builder-monorepo.git
   cd resume-builder-monorepo
   ```

2. **Navigate to the backend directory:**

   ```sh
   cd backend
   ```

3. **Create a `.env` file:**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/resume_builder
   JWT_SECRET=your_jwt_secret
   ```

4. **Build the Docker image:**

   ```sh
   docker build -t resume-builder-backend .
   ```

5. **Run the Docker container:**

   ```sh
   docker run -d --name resume-builder-backend -p 3000:3000 --env-file .env resume-builder-backend
   ```

6. **Verify the deployment:**

   Open a web browser and navigate to `http://localhost:3000`. You should see the NestJS server running.

## Additional Notes

- Ensure that the database is running and accessible from the deployment server.
- You can use Docker Compose to manage the database and the NestJS server together.
- For production deployments, consider using a reverse proxy like Nginx to handle SSL termination and load balancing.
