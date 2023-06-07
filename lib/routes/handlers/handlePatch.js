'use strict';

module.exports = async (req, res, next) => {
  try {
    let record = await req.model.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    });

    res.status(200).json(record);

  } catch (e) {
    next({ message: 'Router error: invalid PATCH parameters', cause: e });
  }
}
