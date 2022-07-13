const fs = require('fs');
const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

const config = {
  source: './public',
  comments: JSON.parse(fs.readFileSync('./data/comments.json', 'utf8')),
  logger: console.log
};

startServer(1234, app(config));