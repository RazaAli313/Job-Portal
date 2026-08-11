# MERN Job Portal

A full-stack job platform that connects candidates with job opportunities through authenticated workflows, searchable listings and a responsive web interface.

## Features

- User registration and login
- JWT-based authentication
- Job discovery and search
- Candidate-facing application workflows
- MongoDB-backed persistence
- REST API integration
- Real-time-ready backend with Socket.IO
- Browser notifications and validation feedback

## Technology

- React
- Node.js and Express 5
- MongoDB and Mongoose
- JSON Web Tokens
- bcrypt
- Axios
- Socket.IO

## Repository layout

- backend/ — Express API, authentication and database logic
- frontend/client components — React user interface
- package.json — shared/root dependencies

## Local development

### Backend

~~~bash
cd backend
npm install
~~~

Create a local .env file with the MongoDB connection string, JWT secret, frontend origin and any service-specific values used by the backend. Start the server using the script defined in backend/package.json.

### Frontend

Install dependencies in the frontend directory used by the repository and start its development server.

## Security notes

- Keep JWT secrets and database credentials outside source control.
- Apply authorization checks on the server, not only in the UI.
- Validate and normalize job-search parameters.
- Rate-limit authentication and application endpoints.
- Restrict Socket.IO origins in production.

## Possible next steps

- Add integration tests for authentication and applications.
- Document the API with OpenAPI.
- Add pagination and indexed search.
- Containerize the frontend, backend and database.
- Add a GitHub Actions test workflow.

## Author

Built by [Muhammad Raza Ali](https://github.com/RazaAli313).
