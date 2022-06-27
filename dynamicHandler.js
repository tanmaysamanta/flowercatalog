const fs = require('fs');
const { serveFileContent } = require('./serveFileContent');

const commentHandler = (request, response) => {
  const { params } = request;
  const comments = JSON.parse(fs.readFileSync('./public/comments.json', 'utf8'));
  comments.push(params);
  const content = JSON.stringify(comments);
  fs.writeFileSync('./public/comments.json', content);
  console.log(content);
  response.setHeaders('location', '/guestbook.html');
  response.statusCode = 301;
  response.send('');
  return true;
};

const dynamicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guestbook.html') {
    return serveFileContent(request, response);
  }
  if (uri === '/addcomment') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler };