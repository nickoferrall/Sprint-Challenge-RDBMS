const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

module.exports = {
  getProjectActions: function(projectId) {
    // return console.log('project', projectId);
    db('project')
      .join('action', 'action.action_id', 'project.id')
      .select('project.id', 'action.action_id');
    //   .where('project.id', projectId);
  }
};
