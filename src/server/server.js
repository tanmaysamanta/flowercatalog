const http = require('http');

const startServer = (port, handler) => {
  const server = http.createServer((request, response) => {
    handler(request, response);
  })
  server.listen(port, () => console.log(`Server listening on port ${port}`));
};

module.exports = { startServer };
