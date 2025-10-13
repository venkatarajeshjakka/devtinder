# DevTinder

Tinder for Developers – a Node.js REST API application to help developers connect.

## Features

- Express.js server with JSON and URL-encoded body parsing
- MongoDB connection using Mongoose with automatic connection handling
- User management with CRUD operations
- Schema validation with Mongoose
- Logging and error handling middleware
- RESTful API endpoints

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm
- MongoDB instance (local or cloud)

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on [http://localhost:3040](http://localhost:3040).

### Environment Variables

Create a `.env` file in the root directory with:

```
DATABASE_URL=mongodb://localhost:27017/
DATABASE_NAME=devtinder
```

## Project Structure

```
src/
	app.js                # Main Express app with API routes
	config/
		database.js         # MongoDB connection logic
	models/
		user.js             # User schema and model
	middlewares/
		logging-middleware.js  # Logs requests
		error-middleware.js    # Handles errors
		index.js               # Middleware exports
```

## User Schema

The User model includes the following fields:

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| firstName | String | Yes | Min: 4, Max: 100 characters |
| lastName | String | No | - |
| email | String | Yes | Unique, lowercase, trimmed |
| password | String | Yes | - |
| age | Number | No | Min: 18 |
| gender | String | No | Enum: ['male', 'female', 'others'] |
| photoUrl | String | No | - |
| bio | String | No | - |
| skills | Array of Strings | No | - |
| timestamps | Auto-generated | Yes | createdAt, updatedAt |

## API Endpoints

### User Management

#### POST /signup
Create a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword",
  "age": 25,
  "gender": "male",
  "photoUrl": "https://example.com/photo.jpg",
  "bio": "Full-stack developer",
  "skills": ["JavaScript", "Node.js", "React"]
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User signed up successfully",
  "user": { /* user object */ }
}
```

#### GET /user
Get user by email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "user": { /* user object */ }
}
```

#### GET /feed
Get all users.

**Response:** `200 OK`
```json
{
  "success": true,
  "users": [ /* array of user objects */ ]
}
```

#### PATCH /user/:id
Update user information by ID.

**URL Parameters:**
- `id` - User's MongoDB ObjectId

**Request Body:**
```json
{
  "firstName": "Jane",
  "bio": "Senior Full-stack developer"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": { /* updated user object */ }
}
```

#### DELETE /user/:id
Delete user by ID.

**URL Parameters:**
- `id` - User's MongoDB ObjectId

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "User deleted successfully",
  "user": { /* deleted user object */ }
}
```

### Other Routes

- `GET /` : Homepage - Returns a welcome message

## Middleware

- **Logging**: Logs each request's URL, method, and timestamp
- **Error**: Handles errors and returns JSON error responses

## Database

The application uses Mongoose to connect to MongoDB. The database connection is established before the server starts, ensuring all database operations are available immediately. Update your `.env` file with your database details.

## Error Handling

All API endpoints include error handling:
- **404 Not Found**: Returned when a user is not found
- **500 Internal Server Error**: Handled by the error middleware
- All responses follow a consistent JSON format with `success` and `message` fields

## Author

Venkata Rajesh Jakka

## License

ISC
