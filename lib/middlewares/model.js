'use strict';

module.exports = (models) => (req, res, next) => {
  try {
    const model = req.params.model;
    req.model = models[model];
    next();
  } catch (e) {
    next({message: 'Router error: invalid model', cause: e});
  }
}
