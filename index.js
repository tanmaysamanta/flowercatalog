const { createApp } = require('./src/app');

const config = {
  commentsFile: './data/comments.json'
};
const sessions = {};
const logger = console.log

const app = createApp(config, sessions, logger);

app.listen(1234, () => console.log('Server is listening on 1234'));
