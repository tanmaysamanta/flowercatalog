const fs = require('fs');
const { serveFileContent } = require('./serveFileContent');

const generateTag = (tag, text) => {
  return `<${tag}>${text}</${tag}>`
};

const getTime = () => {
  const time = new Date();
  return `${time.toLocaleString()}`;
};

const formatComment = (comments) => {
  formatedComments = '';
  comments.forEach(comment => {
    const text = `${comment.time}  ${comment.name} : ${comment.comment}`
    formatedComments += generateTag('div', text);
  });
  return formatedComments;
};

function updateFile(formatedComments) {
  let template = fs.readFileSync('./public/template.html', 'utf8');
  template = template.replace('__COMMENT__', generateTag('div', formatedComments));
  fs.writeFileSync('./public/guestbook.html', template);
};

const commentHandler = (request, response) => {
  const { params } = request;
  const currentTime = getTime();
  params.time = currentTime;

  const comments = JSON.parse(fs.readFileSync('./public/comments.json', 'utf8'));
  comments.unshift(params);

  const content = JSON.stringify(comments);
  fs.writeFileSync('./public/comments.json', content);

  const formatedComments = formatComment(comments);
  updateFile(formatedComments);

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
