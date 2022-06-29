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
  response.setHeader('content-type', 'text/html')
  response.end(content);
  return true;
};

const getEntry = (request) => {
  const comment = {};
  const entries = request.url.searchParams.entries();
  for (const entry of entries) {
    comment[entry[0]] = entry[1];
  }
  comment.time = getTime();
  return comment;
};

const commentHandler = (request, response) => {
  const entry = getEntry(request);
  const comments = getComments('./public/comments.json');
  comments.unshift(entry);
  const content = JSON.stringify(comments);
  fs.writeFileSync('./public/comments.json', content);
  const formatedComments = formatComments(comments);
  const fileContent = getFileContent('./public/template.html', formatedComments);
  response.setHeader('location', '/guestbook');
  response.setHeader('content-type', 'text/html')
  response.statusCode = 301;
  response.end(fileContent);
  return true;
};

const dynamicHandler = (request, response) => {
  const pathname = request.url.pathname;
  if (pathname === '/guestbook') {
    return guestbookHandler(request, response);
  }
  if (pathname === '/addcomment') {
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { dynamicHandler };
