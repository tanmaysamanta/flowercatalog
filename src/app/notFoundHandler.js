const html = (text) => `<html><body><h1>${text}</h1></body></html>`;

const notFound = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 404;
  response.end(html('Not found'));
  return true;
};

const logHandler = logger => (request, response, next) => {
  if (logger) {
    logger(request.method, request.url.pathname);
  }
  next();
};

module.exports = { notFound, logHandler };
