const express = require('express');
const router = express.Router();
const projectModel = require('../db');

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

// router.get('/:id/action', async (req, res) => {
//   try {
//     const { id } = req.params;
//     // const action = await projectModel.getProjectActions();
//     // console.log('action = ', action);

//     const project = await db('project').where({ id: id[0] })

//     // const project = await db('project').where({ id: id[0] });
//     // const action = await db('action').where({ action_id: id });
//     // const eachProject = project.map(
//     //   task =>
//     //     `id: ${task.id} name: ${task.name} description: ${
//     //       task.description
//     //     } completed: ${task.completed}`
//     // );
//     // const eachAction = action.map(a => `Action: ${a.description}`);
//     // const answer = [eachProject, eachAction];
//     // res.status(responseStatus.success).json(answer);
//   } catch (error) {
//     console.log('error =', error);
//     res.status(responseStatus.serverError).json({ message: 'Error.' });
//   }
// });

router.get('/:id/action', (req, res) => {
  db.from('project')
    .innerJoin('action', 'project.id', 'action.action_id')
    .where('action.action_id', req.params.id)
    .then(function(data) {
      res.send(data);
      console.log('data... ', data);
    })
    .catch(err => res.status(responseStatus.serverError).json(err));
  //   console.log('err....', err);
});

module.exports = router;
