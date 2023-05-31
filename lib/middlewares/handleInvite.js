'use strict';

const { tables } = require('../models');
const { poll } = tables;
 
module.exports = async (req, res, next) => {
  if (!req.params.id) {
    next({code: 400, message: 'Invalid Request, missing parameters'})
  }

  try {
    let pollRecord = await poll.findOne({
      where: { id: req.params.pollId }
    });
    res.status(201).json({
      invitation: pollRecord.generateInvite(),
    });
  } catch (e) {
    next({ message: 'Router Error: unable to generate invitation', cause: e });
  }
}
