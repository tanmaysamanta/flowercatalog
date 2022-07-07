const logoutHandler = sessions => (request, response, next) => {
  const { url, method, session } = request;
  if (url.pathname === '/logout' && method === 'GET') {
    if (!session) {
      response.statusCode = 400;
      response.end('Bad request');
      return;
    }

    delete sessions[session];
    response.setHeader('get-cookie', `sessionId=${session.sessionId};max-age=0`);
    response.statusCode = 302;
    response.setHeader('location', '/');
    response.end('');
    return;
  }
  next();
};

module.exports = { logoutHandler };
