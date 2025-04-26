# Deployment Playbook

This playbook provides instructions for deploying the Resume Builder Monorepo project to production.

## Prerequisites

Before you begin, ensure you have the following:

- A Vercel account for frontend deployment
- A server for deploying the NestJS backend
- A PostgreSQL database for the backend

## Frontend Deployment

### Step 1: Configure Vercel

1. **Create a new project**:
   - Log in to your Vercel account.
   - Click on "New Project" and select the repository for the Resume Builder Monorepo.

2. **Set up environment variables**:
   - In the Vercel project settings, add the following environment variables:
     ```env
     NEXT_PUBLIC_API_URL=https://your-backend-server.com/api
     NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
     OTEL_EXPORTER_OTLP_ENDPOINT=https://your-opentelemetry-endpoint.com
     ```

3. **Deploy the frontend**:
   - Click on "Deploy" to deploy the frontend to Vercel.

### Step 2: Configure Domain

1. **Add a custom domain**:
   - In the Vercel project settings, add your custom domain.

2. **Update DNS settings**:
   - Update your DNS settings to point to Vercel's nameservers.

## Backend Deployment

### Step 1: Set Up Server

1. **Provision a server**:
   - Provision a server with your preferred cloud provider (e.g., AWS, DigitalOcean).

2. **Install dependencies**:
   - SSH into the server and install the necessary dependencies (Node.js, npm, PostgreSQL).

### Step 2: Configure Environment Variables

1. **Create a `.env` file**:
   - Create a `.env` file in the backend directory and add the following environment variables:
     ```env
     DATABASE_URL=postgresql://user:password@your-database-server:5432/resume_builder
     JWT_SECRET=your_jwt_secret
     ```

### Step 3: Deploy Backend

1. **Clone the repository**:
   - SSH into the server and clone the repository:
     ```sh
     git clone https://github.com/sisovin/resume-builder-monorepo.git
     cd resume-builder-monorepo/backend
     ```

2. **Install dependencies**:
   - Install the backend dependencies:
     ```sh
     npm install
     ```

3. **Run database migrations**:
   - Run the database migrations:
     ```sh
     npx prisma migrate deploy
     ```

4. **Start the backend server**:
   - Start the backend server:
     ```sh
     npm run start:prod
     ```

## Database Backup Strategy

### Step 1: Set Up Automated Backups

1. **Configure automated backups**:
   - Set up automated backups for your PostgreSQL database using your cloud provider's backup service.

### Step 2: Test Backups

1. **Test backup restoration**:
   - Periodically test the restoration of backups to ensure data integrity.

## Rollback Procedures

### Step 1: Create Rollback Plan

1. **Define rollback steps**:
   - Document the steps required to roll back to a previous version of the application.

### Step 2: Test Rollback

1. **Test rollback process**:
   - Periodically test the rollback process to ensure it can be executed smoothly in case of an issue.

## Monitoring and Logging

### Step 1: Set Up Sentry

1. **Configure Sentry**:
   - Set up Sentry for error tracking in both the frontend and backend.

### Step 2: Set Up OpenTelemetry

1. **Configure OpenTelemetry**:
   - Set up OpenTelemetry for observability in both the frontend and backend.

## Conclusion

This playbook provides the necessary steps to deploy the Resume Builder Monorepo project to production. Follow these instructions to configure Vercel for frontend deployment, set up a server for backend deployment, configure environment variables, deploy the backend, set up database backups, define rollback procedures, and configure monitoring and logging.
