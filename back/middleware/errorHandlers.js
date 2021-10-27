function errorMiddleware(err, req, res, next) {
  res.status(err.status).json({ error: err.message });
  next();
}

module.exports = errorMiddleware;
