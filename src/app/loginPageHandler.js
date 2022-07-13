const loginPageHandler = loginPage => (req, res, next) => {
  const { pathname } = req.url;
  const session = req.session;
  if (!session && pathname === '/login') {
    res.setHeader('Content-Type', 'text/html');
    res.end(loginPage);
    return;
  }
  if (session && pathname === '/login') {
    res.setHeader('location', '/guestbook');
    res.statusCode = 302;
    res.end('');
    return;
  }
  next();
};

module.exports = { loginPageHandler };
