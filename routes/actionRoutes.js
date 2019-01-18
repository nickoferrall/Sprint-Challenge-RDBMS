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

module.exports = router;
