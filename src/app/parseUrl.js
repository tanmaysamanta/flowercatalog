const parseUrl = (request, response, next) => {
  const host = request.headers.host;
  const url = request.url;
  request.url = new URL(`http://${host}${url}`);
  next();
};

module.exports = { parseUrl };
