const errorMiddleware = (err, req, res, next) => {
  if (err) {
    console.error(`Error in the stack:${err.stack}`);
    res.status(500).send(`Something broke! you requested URL is ${req.url}`);
  }
};

module.exports = { errorMiddleware };
