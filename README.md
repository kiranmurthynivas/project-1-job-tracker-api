# Job Application Tracker API

A production-style backend API for tracking job applications.
Built using Node.js, Express.js, MongoDB, Mongoose, JWT authentication, validation middleware, centralized error handling, and deployed on Render.

## Live API

```txt
https://project-1-job-tracker-api.onrender.com
```

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Helmet
* Express Rate Limit
* Morgan
* Render Deployment
* Postman Testing

## Features

* User registration and login
* Password hashing using bcryptjs
* JWT-based authentication
* Protected application routes
* User-specific job applications
* Create, read, update, and delete job applications
* Filter applications by status and job type
* Search applications by company or role
* Sort applications
* Pagination
* Centralized error handling
* Request validation middleware
* Secure environment variable configuration
* Production deployment on Render

## API Base URL

```txt
https://project-1-job-tracker-api.onrender.com
```

## Environment Variables

Create a `.env` file locally:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Example file included:

```txt
.env.example
```

Never commit the real `.env` file.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Server runs locally at:

```txt
http://localhost:5000
```

## API Routes

### Health

| Method | Route     | Description  |
| ------ | --------- | ------------ |
| GET    | `/`       | Root route   |
| GET    | `/health` | Health check |

### Auth

| Method | Route                | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register a user              |
| POST   | `/api/auth/login`    | Login user and get JWT token |

### Applications

Protected routes require:

```txt
Authorization: Bearer <token>
```

| Method | Route                   | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/applications`     | Create job application    |
| GET    | `/api/applications`     | Get all user applications |
| GET    | `/api/applications/:id` | Get single application    |
| PATCH  | `/api/applications/:id` | Update application        |
| DELETE | `/api/applications/:id` | Delete application        |

## Filtering, Search, Sorting, Pagination

| Feature            | Example                               |
| ------------------ | ------------------------------------- |
| Filter by status   | `/api/applications?status=Applied`    |
| Filter by job type | `/api/applications?jobType=Full-time` |
| Search             | `/api/applications?search=google`     |
| Sort by oldest     | `/api/applications?sort=oldest`       |
| Sort by company    | `/api/applications?sort=company`      |
| Pagination         | `/api/applications?page=1&limit=5`    |

## Example Register Request

```http
POST /api/auth/register
```

```json
{
  "name": "Kiran",
  "email": "kiran@test.com",
  "password": "password123"
}
```

## Example Login Request

```http
POST /api/auth/login
```

```json
{
  "email": "kiran@test.com",
  "password": "password123"
}
```

## Example Create Application Request

```http
POST /api/applications
```

```json
{
  "company": "Google",
  "role": "Backend Developer",
  "status": "Applied",
  "jobType": "Full-time",
  "location": "Bangalore",
  "salary": 1200000,
  "notes": "Applied through careers page"
}
```

## Postman Collection

Postman collection and environment are available inside the `docs/` folder.

```txt
docs/job-tracker-api.postman_collection.json
docs/job-tracker-api.postman_environment.json
```

## Deployment

The backend is deployed on Render and connected to MongoDB Atlas.

Deployment proof:

* Render build successful
* MongoDB Atlas connected successfully
* Live API tested using Postman
* Auth and protected CRUD routes verified
* Filtering, search, sorting, and pagination tested
