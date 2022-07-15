const fs = require('fs');
const { guestBookHandler, addCommentHandler } = require('./app/guestBookHandler.js');
const { logHandler } = require('./app/logHanldler.js');
const { Guestbook } = require('./app/guestBook.js');
const { injectCookies } = require('./app/cookiesHandler.js');
const { injectSession } = require('./app/injectSession.js');
const { loginHandler } = require('./app/loginHandler.js');
const { loginPageHandler } = require('./app/loginPageHandler.js');
const { injectBodyParams } = require('./app/bodyParamsHandler.js');
const { logoutHandler } = require('./app/logoutHandler.js');

const express = require('express');

const createLoginRouter = sessions => {
  const handleLogin = loginHandler(sessions);

  const loginRouter = express.Router();
  loginRouter.get('/', loginPageHandler);
  loginRouter.post('/', handleLogin);

  return loginRouter;
};

const createApp = (config, sessions = {}, logger) => {

  const app = express();
  const comments = JSON.parse(fs.readFileSync(config.commentsFile, 'utf8'))
  const guestBook = new Guestbook(comments);
  const handleLog = logHandler(logger);
  const handleGuestBook = guestBookHandler(guestBook, config.commentsFile);
  const handleLogout = logoutHandler(sessions);
  const handleAddComment = addCommentHandler(guestBook, config.commentsFile);
  const loginRouter = createLoginRouter(sessions);

  app.use(handleLog);
  app.use(express.urlencoded({ extended: true }));
  app.use(injectBodyParams);
  app.use(injectCookies);
  app.use(injectSession(sessions));
  app.use(express.static('public'));

  app.use('/login', loginRouter);
  app.get('/guestbook', handleGuestBook);
  app.get('/logout', handleLogout);
  app.post('/add-comment', handleAddComment);

  return app;
};

module.exports = { createApp };
