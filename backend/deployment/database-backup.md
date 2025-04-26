# Database Backup Strategy

This document outlines the strategy for backing up the database for the Resume Builder application.

## Prerequisites

- PostgreSQL installed on the server
- Sufficient storage space for backups
- Access to the server via SSH

## Steps

1. **Create a backup directory:**

   ```sh
   mkdir -p /path/to/backup/directory
   ```

2. **Create a backup script:**

   Create a script named `backup.sh` with the following content:

   ```sh
   #!/bin/bash

   # Variables
   BACKUP_DIR="/path/to/backup/directory"
   TIMESTAMP=$(date +"%F")
   BACKUP_FILE="$BACKUP_DIR/resume_builder_backup_$TIMESTAMP.sql"

   # Create a backup
   pg_dump -U postgres -h localhost resume_builder > $BACKUP_FILE

   # Compress the backup
   gzip $BACKUP_FILE

   # Remove old backups (older than 7 days)
   find $BACKUP_DIR -type f -name "*.gz" -mtime +7 -exec rm {} \;
   ```

3. **Make the script executable:**

   ```sh
   chmod +x /path/to/backup/directory/backup.sh
   ```

4. **Schedule the backup:**

   Use `cron` to schedule the backup script to run daily. Open the crontab editor:

   ```sh
   crontab -e
   ```

   Add the following line to schedule the backup at 2 AM every day:

   ```sh
   0 2 * * * /path/to/backup/directory/backup.sh
   ```

## Additional Notes

- Ensure that the PostgreSQL user has the necessary permissions to perform backups.
- Monitor the backup directory to ensure that backups are being created and old backups are being removed as expected.
- Consider offsite storage for backups to ensure data recovery in case of server failure.
