'use strict';

module.exports = async (req, res, next) => {

  let records = null;
  let options = {};

  try {
    if (req.model.Associations) {
      options.include = req.model.Associations.map(model => ({ model }) );
    }

    // check for id param
    if (req.params.id) {
      records = await req.model.findByPk(req.params.id, options);
    } else {
      records = await req.model.findAll(options);
    }
    res.status(200).json({
      count: typeof records.length === 'number' ? records.length : 1,
      records,
    })
  } catch (e) {
    next({ message: "Router error: invalid query", cause: e });
  }
}
