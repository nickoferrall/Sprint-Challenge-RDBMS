const express = require('express');
const router = express.Router();

const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

const responseStatus = {
  success: 200,
  postCreated: 201,
  badRequest: 400,
  notFound: 404,
  serverError: 500
};

router.get('/', (req, res) => {
  db('action')
    .then(action => {
      res.status(responseStatus.success).json(action);
    })
    .catch(err => res.status(responseStatus.serverError).json(err));
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('action').insert(req.body);
    const actionResponse = await db('action').where({ id: ids[0] });
    res.status(responseStatus.postCreated).json(actionResponse);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ message: 'Error adding action.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteAction = await db('action')
      .where({ id: req.params.id })
      .del();
    if (!deleteAction) {
      res.status(responseStatus.badRequest);
    } else {
      res.status(responseStatus.success).json(deleteAction);
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ message: 'Error deleting action.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const myUpdate = await db('action')
      .where({ id: req.params.id })
      .update(changes);
    if (!myUpdate) {
      res
        .status(responseStatus.badRequest)
        .json({ message: 'This ID does not exist in the database.' });
    } else {
      res.status(responseStatus.success).json(myUpdate);
    }
  } catch (error) {
    res
      .status(responseStatus.badRequest)
      .json({ errorMessage: 'Unable to update that action.' });
  }
});

module.exports = router;
