const createSession = (req, res, sessions) => {
  const time = new Date();
  const sessionId = time.getTime();
  const session = { sessionId, time, username: req.cook };
  sessions[sessionId] = session;
  return session;
};

const loginHandler = sessions => (req, res) => {
  const session = createSession(req, res, sessions);
  res.setHeader('Set-Cookie', `sessionId=${session.sessionId}`);
  res.statusCode = 302;
  res.setHeader('location', '/guestbook');
  res.end('');
  return;
};

module.exports = { loginHandler };