const fs = require('fs');

const serveFileContent = ({ uri }, response, path) => {
  if (uri === '/') {
    uri = '/homePage.html'
  }
  const fileName = path + uri;
  if (fs.existsSync(fileName)) {
    const content = fs.readFileSync(fileName);
    response.setHeaders('content-type', 'text/html');
    response.send(content);
    return true;
  }
  return false;
};

module.exports = { serveFileContent };
