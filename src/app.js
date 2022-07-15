const fs = require('fs');
const { logHandler } = require('./app/logHanldler.js');
const { Guestbook } = require('./app/guestBook.js');
const { injectCookies } = require('./app/cookiesHandler.js');
const { injectSession } = require('./app/injectSession.js');
const { injectBodyParams } = require('./app/bodyParamsHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');
const { createLoginRouter } = require('./app/routes/login.js');
const { createGuestBookRouter } = require('./app/routes/guestbook.js');

const express = require('express');

const createApp = (config, sessions = {}, logger) => {

  const app = express();
  const comments = JSON.parse(fs.readFileSync(config.commentsFile, 'utf8'))
  const guestBook = new Guestbook(comments);
  const handleLog = logHandler(logger);
  const handleLogout = logoutHandler(sessions);
  const loginRouter = createLoginRouter(sessions);
  const guestBookRouter = createGuestBookRouter(guestBook, config);

  app.use(handleLog);
  app.use(express.urlencoded({ extended: true }));
  app.use(injectBodyParams);
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(express.static('public'));

  app.use('/login', loginRouter);
  app.use('/guestbook', guestBookRouter);
  app.get('/logout', handleLogout);

  return app;
};

module.exports = { createApp };
