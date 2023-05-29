'use strict';

module.exports = async (req, res, next) => {

  let records = null;

  try {
    // check for id param
    if (req.params.id) {
      records = await req.model.findByPk(req.params.id);
    } else {
      records = await req.model.findAll({});
    }
    res.status(200).json({
      count: records.length || 1,
      records,
    })
  } catch (e) {
    next({ message: "Router error: invalid query", cause: e });
  }
}
