const { createServer } = require('net');
const { parseRequest } = require('./parseRequest.js');
const { Response } = require('./response.js');
const { serveFileContent } = require('./serveFileContent.js');

const createHandler = (handlers) => {
  return (request, response, path) => {
    for (const handler of handlers) {
      if (handler(request, response, path)) {
        return true;
      }
    }
    return false;
  };
};

const onNewConnection = (socket, handle, path) => {
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    console.log(request.method, request.uri);
    const response = new Response(socket);
    handle(request, response, path);
  })
};

const startServer = (port, handle, path = './public') => {
  const server = createServer((socket) => onNewConnection(socket, handle, path));
  server.listen(port, () => console.log(`Server listening on port ${port}`));
};

const handlers = [serveFileContent];
startServer(1234, createHandler(handlers), process.argv[2]);
