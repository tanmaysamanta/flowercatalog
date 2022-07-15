const logHandler = logger => (request, response, next) => {
  if (logger) {
    logger(request.method, request.url);
  }
  next();
};

module.exports = { logHandler };
