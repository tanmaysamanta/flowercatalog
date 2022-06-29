const { dynamicHandler } = require('./app/dynamicHandler.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { notFound } = require('./app/notFoundHandler.js');

const createHandler = (handlers) => {
  return (request, response) => {
    for (const handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

const handlers = [serveFileContent, dynamicHandler, notFound];
const handler = createHandler(handlers);

module.exports = { handler };