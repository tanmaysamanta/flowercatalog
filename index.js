const fs = require('fs');
const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const config = {
  source: './public',
  commentsFile: './data/comments.json'
};

const sessions = {};

startServer(1234, app(config, sessions, console.log));