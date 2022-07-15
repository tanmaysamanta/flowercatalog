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
  response.setHeader('Content-type', 'text/plain');
  guestBook.addComment(bodyParams);
  persistDB(guestBook, request.commentsFile);
  response.end(JSON.stringify(guestBook.toString()));
  return;
};


const guestBookHandler = (guestBook, commentsFile) => (request, response) => {
  request.commentsFile = commentsFile;

  if (!request.session) {
    response.setHeader('location', '/login');
    response.statusCode = 302;
    response.end('');
    return;
  }
  request.guestBook = guestBook;
  return showGuestBook(request, response);
};

const addCommentHandler = (guestBook, commentsFile) => (request, response) => {
  request.guestBook = guestBook;
  request.commentsFile = commentsFile;
  return addComment(request, response);
};

module.exports = { guestBookHandler, addCommentHandler };
