const fs = require('fs');

const generateTag = (tag, text) => {
  return `<${tag}>${text}</${tag}>`
};

const getTime = () => {
  const time = new Date();
  return time.toLocaleString();
};

const formatComments = (comments) => {
  let formatedComments = '';
  comments.forEach(comment => {
    const text = `${comment.time}  ${comment.name} : ${comment.comment}`
    formatedComments += generateTag('div', text);
  });
  return formatedComments;
};

const getComments = (fileName) => {
  return JSON.parse(fs.readFileSync(fileName, 'utf8'));
};

const getFileContent = (fileName, newContent) => {
  const content = fs.readFileSync(fileName, 'utf8');
  return content.replace('__COMMENT__', generateTag('div', newContent));
};

const guestbookHandler = (request, response) => {
  const comments = getComments('./public/comments.json');
  const formatedComments = formatComments(comments);
  const content = getFileContent('./public/template.html', formatedComments);
  response.setHeaders('content-type', 'text/html')
  response.send(content);
  return true;
};

const commentHandler = (request, response) => {
  const { params } = request;
  const currentTime = getTime();
  params.time = currentTime;

  const comments = getComments('./public/comments.json');
  comments.unshift(params);

  const content = JSON.stringify(comments);
  fs.writeFileSync('./public/comments.json', content);

  const formatedComments = formatComments(comments);
  const fileContent = getFileContent('./public/template.html', formatedComments);

  response.setHeaders('location', '/guestbook');
  response.setHeaders('content-type', 'text/html')
  response.statusCode = 301;
  response.send(fileContent);
  return true;
};

const dynamicHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guestbook') {
    return guestbookHandler(request, response);
  }
  if (uri === '/addcomment') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler };
