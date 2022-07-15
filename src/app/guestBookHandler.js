const {
  getFileContent,
  persistDB,
  formatComments } = require('./utils.js')

const showGuestBook = (request, response) => {
  const { guestBook } = request;
  const comments = JSON.parse(guestBook.toString());
  const formatedComments = formatComments(comments);
  const content = getFileContent('./resource/template.html', formatedComments);
  response.type('text/html')
  response.end(content);
  return true;
};

const addComment = (request, response) => {
  const { guestBook } = request;
  const { bodyParams } = request;

  bodyParams.time = new Date().toLocaleString();
  response.type('text/plain');
  guestBook.addComment(bodyParams);
  persistDB(guestBook, request.commentsFile);
  response.end(JSON.stringify(guestBook.toString()));
  return;
};


const guestBookHandler = (guestBook, commentsFile) => (request, response) => {
  request.commentsFile = commentsFile;

  if (!request.session) {
    response.redirect('/login');
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
