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

const getPreviousComments = (fileName) => {
  return JSON.parse(fs.readFileSync(fileName, 'utf8')) || [];
};

const getFileContent = (fileName, newContent) => {
  const content = fs.readFileSync(fileName, 'utf8');
  return content.replace('__COMMENT__', generateTag('div', newContent));
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
  const comments = getPreviousComments(request.commentsFile);
  comments.unshift(entry);
  const content = JSON.stringify(comments);
  fs.writeFileSync(request.commentsFile, content);
  const formatedComments = formatComments(comments);
  const fileContent = getFileContent('./resource/template.html', formatedComments);
  response.setHeader('location', '/guestbook');
  response.setHeader('content-type', 'text/html')
  response.statusCode = 302;
  response.end(fileContent);
  return true;
};

const showGuestBook = (request, response) => {
  const comments = getPreviousComments(request.commentsFile);
  const formatedComments = formatComments(comments);
  const content = getFileContent('./resource/template.html', formatedComments);
  response.setHeader('content-type', 'text/html')
  response.end(content);
  return true;
};

const guestBookHandler = (commentsFile) => (request, response) => {
  const pathname = request.url.pathname;
  if (pathname === '/guestbook' && request.method === 'GET') {
    request.commentsFile = commentsFile;
    return showGuestBook(request, response);
  }
  if (pathname === '/addcomment' && request.method === 'GET') {
    request.commentsFile = commentsFile;
    return commentHandler(request, response);
  }
  return false;
};

module.exports = { guestBookHandler };
