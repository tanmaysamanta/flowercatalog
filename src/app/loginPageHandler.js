const loginPage = `<html lang="en">

<head>
  <title>login</title>
</head>

<body>
  <form action="/login" method="post">
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

const loginPageHandler = (request, response) => {
  const session = request.session;
  if (!session) {
    response.setHeader('Content-Type', 'text/html');
    response.end(loginPage);
    return;
  }
  response.setHeader('location', '/guestbook');
  response.statusCode = 302;
  response.end('');
  return;
};

module.exports = { loginPageHandler };
