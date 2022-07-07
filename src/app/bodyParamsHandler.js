const bodyParams = (paramsStr) => {
  const params = {};
  const entries = paramsStr.entries();
  for (const entry of entries) {
    params[entry[0]] = entry[1];
  }
  return params;
};

const injectBodyParams = (req, res, next) => {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  })
  req.on('end', () => {
    req.bodyParams = bodyParams(new URLSearchParams(data));
    next();
  })
};

module.exports = { injectBodyParams };
