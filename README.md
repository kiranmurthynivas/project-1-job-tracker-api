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

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

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