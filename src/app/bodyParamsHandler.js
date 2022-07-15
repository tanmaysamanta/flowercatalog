const injectBodyParams = (req, res, next) => {
  req.bodyParams = req.body;
  next();
};

module.exports = { injectBodyParams };
