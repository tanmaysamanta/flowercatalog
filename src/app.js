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

const app = (config, sessions = {}, logger) => {
  const comments = JSON.parse(fs.readFileSync(config.commentsFile, 'utf8'))
  const guestBook = new Guestbook(comments);
  const handleLog = logHandler(logger);
  const handleSession = injectSession(sessions);
  const handleLogin = loginHandler(sessions);
  const handleLogout = logoutHandler(sessions);
  const handleGuestBook = guestBookHandler(guestBook, config.commentsFile);
  const handleStaticFile = serveFileContent(config.source);

  const router = createRouter(
    parseUrl,
    handleLog,
    injectBodyParams,
    injectCookies,
    handleSession,
    handleLogin,
    loginPageHandler,
    handleLogout,
    handleGuestBook,
    handleStaticFile,
    notFound);
  return router;
};

module.exports = { app };
