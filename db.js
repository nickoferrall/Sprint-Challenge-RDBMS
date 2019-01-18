const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

module.exports = {
  getProjectActions: function(projectId) {
    // return console.log('project', projectId);
    db('project')
      .leftJoin('project.id', 'action.action_id')
      .select('project.name', 'action.action_id')
      .where('action.action_id', projectId);
  }
};
