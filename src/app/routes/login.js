const express = require('express');
const { loginHandler } = require('../loginHandler');
const { loginPageHandler } = require('../loginPageHandler');

const createLoginRouter = sessions => {
  const handleLogin = loginHandler(sessions);

  const loginRouter = express.Router();
  loginRouter.get('/', loginPageHandler);
  loginRouter.post('/', handleLogin);

  return loginRouter;
};

module.exports = { createLoginRouter };