const {
  getFileContent,
  persistDB,
  formatComments } = require('./utils.js')

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
  const { guestBook } = request;
  const { bodyParams } = request;

  bodyParams.time = new Date().toLocaleString();
  response.setHeader('Content-type', 'plain/text');
  guestBook.addComment(bodyParams);
  persistDB(guestBook);
  response.end(JSON.stringify(guestBook.toString()));
  return;
};

const guestBookHandler = (guestBook) => (request, response, next) => {
  const pathname = request.url.pathname;

  if (pathname === '/guestbook' && !request.session) {
    response.setHeader('location', '/login');
    response.statusCode = 302;
    response.end('');
    return true;
  }

  if (pathname === '/guestbook' && request.method === 'GET') {
    request.guestBook = guestBook;
    return showGuestBook(request, response);
  }

  if (pathname === '/add-comment' && request.method === 'POST') {
    request.guestBook = guestBook;
    return addComment(request, response);
  }
  next();
};

module.exports = { guestBookHandler };
