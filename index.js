const { startServer } = require('./src/server/server.js');
const { dynamicHandler } = require('./src/app/dynamicHandler.js');
const { serveFileContent } = require('./src/app/serveFileContent.js');
const { notFound } = require('./src/app/notFoundHandler.js');
const { createHandler } = require('./src/app/createHandler.js');

const handlers = [dynamicHandler, serveFileContent, notFound];
startServer(2323, createHandler(handlers));