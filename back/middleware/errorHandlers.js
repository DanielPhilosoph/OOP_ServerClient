function errorMiddleware(err, req, res, next) {
  if (err.status !== undefined && err.message !== undefined) {
    res.status(err.status).json({ error: err.message });
  }
  next();
}

module.exports = errorMiddleware;
