const fs = require('fs');
const { guestBookHandler } = require('./app/guestBookHandler.js');
const { serveFileContent } = require('./app/serveFileContent.js');
const { notFound, logHandler } = require('./app/notFoundHandler.js');
const { createRouter } = require('./server/router.js');
const { Guestbook } = require('./app/guestBook.js');

const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
const guestbook = new Guestbook(comments);

const app = createRouter(logHandler,
  serveFileContent('./public'),
  guestBookHandler(guestbook),
  notFound);

module.exports = { app };