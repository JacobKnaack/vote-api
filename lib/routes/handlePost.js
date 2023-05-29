'use strict';

module.exports = async (req, res, next) => {
  try {
    let recordValues = req.body;
    let record = await req.model.create(recordValues);
    res.status(201).json(record);
  } catch(e) {
    next({message: 'Router error: invalid POST request', cause: e});
  }
}