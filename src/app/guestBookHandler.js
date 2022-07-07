const { getEntry,
  getFileContent,
  persistDB,
  formatComments } = require('./utils.js')

const commentHandler = (request, response) => {
  const { guestBook } = request;
  const entry = getEntry(request);
  guestBook.addComment(entry);
  persistDB(guestBook);

  response.setHeader('location', '/guestbook');
  response.statusCode = 302;
  response.end('');
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

  if (pathname === '/addcomment' && request.method === 'POST') {
    request.guestBook = guestBook;
    return addComment(request, response);
  }
  next();
};

module.exports = { guestBookHandler };
