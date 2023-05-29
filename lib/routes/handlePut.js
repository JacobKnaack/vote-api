'use strict';

module.exports = async (req, res, next) => {
  try {
    let [record, created] = await req.model.upsert({id: req.params.id, ...req.body});
    res.status(200).json(record);
  } catch (e) {
    next({ message: 'Router error: invalid PUT parameters', cause: e });
  }
}
