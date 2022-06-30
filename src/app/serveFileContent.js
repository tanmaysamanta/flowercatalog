const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.jpg': 'image/jpg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.css': 'text/css',
  '.pdf': 'application/pdf'
};

const getMimeType = (extension) => {
  return mimeTypes[extension] || 'text/plain';
};

const serveFileContent = rootSource => (request, response) => {
  const pathname = request.url.pathname;
  const fileName = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.join(rootSource, fileName);
  const extension = path.extname(fileName);
  const mimeType = getMimeType(extension);

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    response.setHeader('Content-Type', mimeType);
    response.end(content);
    return true;
  }
  return false;
};

module.exports = { serveFileContent };
