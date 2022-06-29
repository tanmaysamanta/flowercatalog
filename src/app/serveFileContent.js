const fs = require('fs');

const serveFileContent = (request, response) => {
  let fileName = `./public${request.url.pathname}`;
  if (request.url.pathname === '/') {
    fileName = './public/homePage.html'
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
