'use strict';

const express = require('express');
const { tables } = require('../models');
const {
  modelParams,
  handleInvite, 
  authenticateInvite
} = require('../middlewares');
const {
  authorization,
  bearerAuth
} = require('../auth');
const {
  handleGet,
  handlePost,
  handlePut,
  handlePatch,
  handleDelete,
} = require('./handlers');

const router = express.Router();
router.param('model', modelParams(tables));

// this needs to be authenticated as a poll admin
router.post('/invite/:pollId', handleInvite);
router.post('/vote', authenticateInvite);

router.get('/:model', handleGet);
router.get('/:model/:id', handleGet);

// these all require authentication credentials
router.post('/:model', handlePost);
router.patch('/:model/:id', handlePatch);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

module.exports = router;
