const createSession = (req, res, sessions) => {
  const time = new Date();
  const sessionId = time.getTime();
  const session = { sessionId, time };
  sessions[sessionId] = session;
  return session;
};

const loginHandler = sessions => (req, res) => {
  const session = createSession(req, res, sessions);
  res.cookie('sessionId', `${session.sessionId}`);
  res.redirect('/guestbook');
  return;
};

module.exports = { loginHandler };
