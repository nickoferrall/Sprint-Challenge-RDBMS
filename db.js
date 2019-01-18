const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

module.exports = {
  //   getProjectActions: function(projectId) {
  //     // return console.log('project', projectId);
  //     db('project')
  //       .select('*')
  //       .from('project')
  //       .join('action', { 'action.action_id': 'project.id' });
  //   }

  getProject: () =>
    db('project')
      .join('action', 'project.id', 'action.action_id')
      .select('project.name', 'action.description')
};
