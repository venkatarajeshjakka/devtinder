# DevTinder

Tinder for Developers – a simple Node.js app to help developers connect.

## Features

- Express.js server
- Basic homepage route

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)

- Express.js server
- MongoDB connection using Mongoose
- Logging and error handling middleware
- Basic homepage and /users route

```bash
npm install
```

- Node.js (v14 or higher recommended)
- npm
- MongoDB instance (local or cloud)

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on [http://localhost:3040](http://localhost:3040).

## Author

Venkata Rajesh Jakka

### Environment Variables

Create a `.env` file in the root directory with:

```
DATABASE_URL=mongodb://localhost:27017/
DATABASE_NAME=devtinder
```

## Project Structure

```
src/
	app.js                # Main Express app
	config/
		database.js         # MongoDB connection logic
	middlewares/
		logging-middleware.js  # Logs requests
		error-middleware.js    # Handles errors
		index.js               # Middleware exports
```

## Routes

- `/` : Homepage
- `/users` : Users route

## Middleware

- **Logging**: Logs each request's URL, method, and timestamp
- **Error**: Handles errors and returns JSON error responses

## Database

Uses Mongoose to connect to MongoDB. Update your `.env` file with your database details.

## License

ISC
