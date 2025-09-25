const { errorMiddleware } = require("./error-middleware");
const { loggingMiddleware } = require("./logging-middleware");

module.exports = { errorMiddleware, loggingMiddleware };
