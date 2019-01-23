exports.up = function(knex, Promise) {
  return knex.schema.createTable('action', function(tbl) {
    tbl.increments('id');
    tbl.string('description');
    tbl.string('notes');
    tbl.boolean('completed');
    tbl
      .integer('action_id')
      .references('id')
      .inTable('project');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('action');
};
