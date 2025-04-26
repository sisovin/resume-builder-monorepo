# API Reference

## Authentication

### POST /api/auth/login
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - `token` (string): JWT token.

### POST /api/auth/register
- **Description**: Registers a new user.
- **Request Body**:
  - `email` (string): User's email.
  - `password` (string): User's password.
- **Response**:
  - `id` (number): User's ID.
  - `email` (string): User's email.

### POST /api/auth/logout
- **Description**: Logs out the user by clearing the JWT token.
- **Response**:
  - `message` (string): Logout confirmation message.

## Resumes

### GET /api/resumes
- **Description**: Retrieves a list of resumes.
- **Response**:
  - `resumes` (array): List of resumes.

### GET /api/resumes/:id
- **Description**: Retrieves a specific resume by ID.
- **Response**:
  - `id` (number): Resume ID.
  - `title` (string): Resume title.
  - `content` (string): Resume content.

### POST /api/resumes
- **Description**: Creates a new resume.
- **Request Body**:
  - `title` (string): Resume title.
  - `content` (string): Resume content.
- **Response**:
  - `id` (number): Resume ID.
  - `title` (string): Resume title.
  - `content` (string): Resume content.

### PATCH /api/resumes/:id
- **Description**: Updates an existing resume by ID.
- **Request Body**:
  - `title` (string): Resume title (optional).
  - `content` (string): Resume content (optional).
- **Response**:
  - `id` (number): Resume ID.
  - `title` (string): Resume title.
  - `content` (string): Resume content.

### DELETE /api/resumes/:id
- **Description**: Deletes a resume by ID.
- **Response**:
  - `message` (string): Deletion confirmation message.

## Health Check

### GET /api/health
- **Description**: Checks the health status of the API.
- **Response**:
  - `status` (string): Health status message.
