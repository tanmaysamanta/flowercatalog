const loginPage = `<html lang="en">

<head>
  <title>login</title>
</head>

<body>
  <form action="/login-page" method="post">
    <div>
      <label for='user'>Name:</label>
      <input type='text' name='user'>
    </div>
    <div>
      <input type='submit' value='login'>
    </div>
  </form>

</body>

</html>`

const loginPageHandler = (req, res, next) => {
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
