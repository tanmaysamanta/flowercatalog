const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');

startServer(1234, app);