const express = require('express');
const { guestBookHandler, addCommentHandler } = require('../guestBookHandler');

const createGuestBookRouter = (guestBook, config) => {
  const handleGuestBook = guestBookHandler(guestBook, config.commentsFile);
  const handleAddComment = addCommentHandler(guestBook, config.commentsFile);

  const guestBookRouter = express.Router();
  guestBookRouter.get('/', handleGuestBook);
  guestBookRouter.post('/', handleAddComment);

  return guestBookRouter;
};

module.exports = { createGuestBookRouter };
