# Rollback Procedures

This document outlines the procedures for rolling back the deployment of the Resume Builder application in case of issues.

## Prerequisites

- Access to the deployment server
- Previous deployment artifacts (Docker images, database backups, etc.)
- SSH access to the server

## Steps

1. **Identify the issue:**

   Determine the cause of the issue and decide if a rollback is necessary. Check logs, monitor services, and gather information to understand the problem.

2. **Notify stakeholders:**

   Inform relevant stakeholders about the issue and the decision to roll back. Provide an estimated timeline for the rollback process.

3. **Stop the current deployment:**

   ```sh
   docker stop resume-builder-backend
   docker rm resume-builder-backend
   ```

4. **Restore the previous Docker image:**

   ```sh
   docker run -d --name resume-builder-backend -p 3000:3000 --env-file .env resume-builder-backend:previous
   ```

5. **Restore the database backup:**

   ```sh
   gunzip -c /path/to/backup/directory/resume_builder_backup_<timestamp>.sql.gz | psql -U postgres -h localhost resume_builder
   ```

6. **Verify the rollback:**

   Ensure that the application is running correctly with the previous version. Check logs, monitor services, and perform basic functionality tests.

7. **Notify stakeholders:**

   Inform stakeholders that the rollback is complete and provide an update on the status of the application.

## Additional Notes

- Keep a record of the issue and the rollback process for future reference.
- Consider implementing additional monitoring and alerting to detect issues earlier.
- Review the deployment process to identify improvements and prevent similar issues in the future.
