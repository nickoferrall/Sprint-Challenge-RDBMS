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
  db('project')
    .then(project => {
      res.status(responseStatus.success).json(project);
    })
    .catch(err => res.status(responseStatus.serverError).json(err));
});

router.post('/', async (req, res) => {
  try {
    const ids = await db('project').insert(req.body);
    const projectResponse = await db('project').where({ id: ids[0] });
    res.status(responseStatus.postCreated).json(projectResponse);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ message: 'Error adding project.' });
  }
});

router.get('/:id/action', async (req, res) => {
  try {
    const project = await db('project')
      .select('id', 'name', 'description', 'completed')
      .where({ id: req.params.id });
    const projectActions = await db
      .from('project')
      .select(
        'action.id',
        'action.description',
        'action.notes',
        'action.completed'
      )
      .innerJoin('action', 'project.id', 'action.action_id')
      .where('action.action_id', req.params.id);
    const answer = [project, projectActions];
    res.status(responseStatus.success).json(answer);
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ message: 'Error retreiving data.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteProject = await db('project')
      .where({ id: req.params.id })
      .del();
    if (!deleteProject) {
      res.status(responseStatus.badRequest);
    } else {
      res.status(responseStatus.success).json(deleteProject);
    }
  } catch (error) {
    res
      .status(responseStatus.serverError)
      .json({ message: 'Error deleting project.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const myUpdate = await db('project')
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
      .json({ errorMessage: 'Unable to update that project.' });
  }
});

module.exports = router;
