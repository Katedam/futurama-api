/* eslint-disable no-undef */
module.exports = (req, res, next) => {
  res.status(404);
  res.send({ err: 'Not Found' });
  next();
};
