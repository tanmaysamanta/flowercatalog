const { dynamicHandler } = require('./app/dynamicHandler.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { notFound, logHandler } = require('./app/notFoundHandler.js');
const { createRouter } = require('./server/router.js');

const handlers = [logHandler, serveFileContent, dynamicHandler, notFound];
const app = createRouter(handlers);

module.exports = { app };