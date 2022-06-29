const html = (text) => `<html><body><h1>${text}</h1></body></html>`;

const notFound = (request, response) => {
  response.setHeader('Content-Type', 'text/html');
  response.end(html('Not found'));
  return true;
};

module.exports = { notFound };