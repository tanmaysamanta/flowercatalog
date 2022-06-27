const fs = require('fs');
const { serveFileContent } = require('./serveFileContent');

const commentHandler = (request, response) => {
  const { params } = request;
  const comments = [];
  console.log(params);
  comments.push(params);
  console.log(comments);
  fs.writeFileSync('./public/comments.json', JSON.stringify(comments));
  const content = `<body>${JSON.parse(comments)}</body>`
  fs.writeFileSync('./public/comments.html', content);
  response.setHeaders('location', '/comments.html');
  response.statusCode = 301;
  response.send('');
  return true;
};

const dynamicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/comments.html') {
    return serveFileContent(request, response);
  }
  if (uri === '/addcomment') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler };