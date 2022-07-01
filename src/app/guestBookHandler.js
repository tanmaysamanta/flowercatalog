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

const getFileContent = (fileName, newContent) => {
  const content = fs.readFileSync(fileName, 'utf8');
  return content.replace('__COMMENT__', generateTag('div', newContent));
};

const getEntry = (request) => {
  const comment = {};
  const entries = request.bodyParams.entries();
  for (const entry of entries) {
    comment[entry[0]] = entry[1];
  }
  comment.time = getTime();
  return comment;
};

const commentHandler = (request, response) => {
  const { guestBook } = request;
  const entry = getEntry(request);
  guestBook.addComment(entry);
  const content = guestBook.toString();
  fs.writeFileSync('data/comments.json', content);
  response.setHeader('location', '/guestbook');
  response.statusCode = 302;
  response.end('');
  return true;
};

const showGuestBook = (request, response) => {
  const { guestBook } = request;
  const comments = JSON.parse(guestBook.toString());
  const formatedComments = formatComments(comments);
  const content = getFileContent('./resource/template.html', formatedComments);
  response.setHeader('content-type', 'text/html')
  response.end(content);
  return true;
};

const addComment = (request, response) => {
  let data = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    data += chunk;
  })
  request.on('end', () => {
    const bodyParams = new URLSearchParams(data);
    request.bodyParams = bodyParams;
    return commentHandler(request, response);
  })
}

const guestBookHandler = (guestBook) => (request, response, next) => {
  const pathname = request.url.pathname;
  if (pathname === '/guestbook' && request.method === 'GET') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }
  if (pathname === '/addcomment' && request.method === 'POST') {
    request.guestBook = guestBook;
    return addComment(request, response);
  }
  next(request, response);
};

module.exports = { guestBookHandler };