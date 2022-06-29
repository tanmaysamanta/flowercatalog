const http = require('http');

const startServer = (port, handler) => {
  const server = http.createServer((request, response) => {
    const host = request.headers.host;
    const url = request.url;
    request.url = new URL(`http://${host}${url}`);
    console.log(request.method, request.url.pathname);
    handler(request, response);
  })
  server.listen(port, () => console.log(`Server listening on port ${port}`));
};

module.exports = { startServer };
