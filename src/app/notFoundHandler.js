const html = (text) => `<html><body><h1>${text}</h1></body></html>`;

const notFound = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.statusCode = 404;
  response.end(html('Not found'));
  return true;
};

const logHandler = (request, response) => {
  console.log(request.method, request.url.pathname);
};

module.exports = { notFound, logHandler };
