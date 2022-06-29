const fs = require('fs');

const serveFileContent = (request, response) => {
  const pathname = request.url.pathname;
  let fileName = `./public${pathname}`;
  if (pathname === '/') {
    fileName = './public/index.html'
  }
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.setHeader('Content-Type', 'text/html');
    response.end(content);
    return true;
  }
  return false;
};

module.exports = { serveFileContent };
