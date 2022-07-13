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

const app = (config, sessions = {}) => {
  const guestbook = new Guestbook(config.comments);
  const router = createRouter(
    parseUrl,
    injectBodyParams,
    injectCookies,
    injectSession(sessions),
    loginHandler(sessions),
    loginPageHandler,
    logoutHandler(sessions),
    serveFileContent(config.source),
    guestBookHandler(guestbook),
    notFound);
  return router;
};

module.exports = { app };
