const { guestBookHandler } = require('./app/guestBookHandler.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { notFound, logHandler } = require('./app/notFoundHandler.js');
const { createRouter } = require('./server/router.js');

const handlers = [
  logHandler,
  serveFileContent('./public'),
  guestBookHandler('./data/comments.json'),
  notFound
];
const app = createRouter(handlers);

module.exports = { app };