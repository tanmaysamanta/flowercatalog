const fs = require('fs');
const { guestBookHandler } = require('./app/guestBookHandler.js');
const { serveFileContent } = require('./app/serveFileHandler.js');
const { notFound, logHandler } = require('./app/notFoundHandler.js');
const { createRouter } = require('./server/router.js');
const { Guestbook } = require('./app/guestBook.js');
const { injectCookies } = require('./app/cookiesHandler.js');
const { injectSession } = require('./app/injectSession.js');
const { loginHandler } = require('./app/loginHandler.js');
const { loginPageHandler } = require('./app/loginPageHandler.js');
const { injectBodyParams } = require('./app/bodyParamsHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { parseUrl } = require("./app/parseUrl");

const comments = JSON.parse(fs.readFileSync('./data/comments.json', 'utf8'));
const guestbook = new Guestbook(comments);

const sessions = {};
const app = createRouter(
  parseUrl,
  logHandler,
  injectBodyParams,
  injectCookies,
  injectSession(sessions),
  loginHandler(sessions),
  loginPageHandler,
  logoutHandler(sessions),
  serveFileContent('./public'),
  guestBookHandler(guestbook),
  notFound);

module.exports = { app };
