const loggingMiddleware = (req, res, next) => {
  console.log(
    `Request URL: ${req.url}, Request Type: ${req.method}, Time: ${new Date()}`
  );
  next();
};

module.exports = { loggingMiddleware };
