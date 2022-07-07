const createSession = (req, res, sessions) => {
  const time = new Date();
  const sessionId = time.getTime();
  const session = { sessionId, time, username: req.cook };
  sessions[sessionId] = session;
  return session;
};

const loginHandler = sessions => (req, res, next) => {
  const { method } = req;
  const { pathname } = req.url;
  if (pathname !== '/login-page') {
    next();
    return;
  }

  if (pathname === '/login-page' && method === 'POST') {
    const session = createSession(req, res, sessions);
    res.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);
    res.statusCode = 302;
    res.setHeader('location', '/guestbook');
    res.end('');
    return;
  }
  next();
};

module.exports = { loginHandler };