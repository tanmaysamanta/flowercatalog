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
    response.type('text/html');
    response.end(loginPage);
    return;
  }
  response.redirect('/guestbook');
  return;
};

module.exports = { loginPageHandler };
