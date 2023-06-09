'use strict';

const express = require('express');
const { tables } = require('../models');
const { modelParams, handleInvite, authenticateInvite } = require('../middlewares');
const handlePost = require('./handlePost');
const handleGet = require('./handleGet');
const handlePatch = require('./handlePatch');
const handlePut = require('./handlePut');
const handleDelete = require('./handleDelete');

const router = express.Router();
router.param('model', modelParams(tables));

// this needs to be authenticated as a poll admin
router.post('/invite/:pollId', handleInvite);
router.post('/vote', authenticateInvite);

router.get('/:model', handleGet);
router.get('/:model/:id', handleGet);

// these require tokens
router.post('/:model', handlePost);
router.patch('/:model/:id', handlePatch);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

module.exports = router;
