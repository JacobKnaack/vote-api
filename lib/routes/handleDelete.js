'use strict';

module.exports = async (req, res, next) => {
  try {
    let rowsRemoved = await req.model.destroy({ where: {id: req.params.id } });

    res.status(200).json({removed: rowsRemoved});
  } catch (e) {
    next({ code: 500, message: 'Router error: invalid DELETE parameters', cause: e });
  }
}
