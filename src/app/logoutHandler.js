const logoutHandler = sessions => (request, response) => {
  const { session } = request;
  if (!session) {
    response.statusCode = 400;
    response.setHeader('content-type', 'text/plain');
    response.end('Bad request');
    return;
  }

  delete sessions[session.sessionId];
  response.setHeader('get-cookie', `sessionId=${session.sessionId};max-age=0`);
  response.statusCode = 302;
  response.setHeader('location', '/');
  response.end('');
  return;
};

module.exports = { logoutHandler };
