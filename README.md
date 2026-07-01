# Job Application Tracker API

A production-style backend API for tracking job applications.

## Features

- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- User-owned job applications
- CRUD operations
- Filtering by status and job type
- Search by company or role
- Sorting
- Pagination
- Centralized error handling
- Request validation
- Security middleware
- Rate limiting
- MongoDB sanitization

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- Morgan
- express-rate-limit

## API Routes

### Auth Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Application Routes

All application routes require Bearer token.

| Method | Route | Description |
|---|---|---|
| GET | `/api/applications` | Get logged-in user's applications |
| POST | `/api/applications` | Create application |
| GET | `/api/applications/:id` | Get one application |
| PATCH | `/api/applications/:id` | Update application |
| DELETE | `/api/applications/:id` | Delete application |

## Query Features

```text
GET /api/applications?status=Applied
GET /api/applications?jobType=Internship
GET /api/applications?search=react
GET /api/applications?sort=oldest
GET /api/applications?page=1&limit=5
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

Use `.env.example` as the local template. Do not commit `.env`.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Server

```txt
http://localhost:5000
```

## Deploy on Render

This repo includes a Render Blueprint at `render.yaml`.

1. Commit and push this repository to GitHub.
2. In the Render Dashboard, choose **New > Blueprint** and connect this repository.
3. Render will create the Node web service from `render.yaml`.
4. When Render prompts for environment variables, set `MONGO_URL` to your MongoDB connection string. `JWT_SECRET` is generated automatically.
5. After the deploy finishes, verify the service at `/health`.

Manual web service settings, if you do not use the Blueprint:

```txt
Language: Node
Build Command: npm ci
Start Command: npm start
Health Check Path: /health
```

## Deployment

- Deployed backend API on Render
- Connected production server to MongoDB Atlas
- Configured environment variables securely
- Tested deployed API routes using Postman
- Verified authentication and protected CRUD routes

Live API:
https://project-1-job-tracker-api.onrender.com
