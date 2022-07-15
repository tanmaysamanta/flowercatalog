const logoutHandler = sessions => (request, response) => {
  const { session } = request;
  if (!session) {
    response.status(400);
    response.type('text/plain');
    response.end('Bad request');
    return;
  }

  delete sessions[session.sessionId];
  response.clearCookie('sessionId');
  response.redirect('/');
  return;
};

module.exports = { logoutHandler };
