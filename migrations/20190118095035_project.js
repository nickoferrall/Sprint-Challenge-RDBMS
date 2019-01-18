exports.up = function(knex, Promise) {
  return knex.schema.createTable('project', function(tbl) {
    tbl.increments('id');
    tbl.string('name', 180);
    tbl.string('description');
    tbl.boolean('completed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('project');
};
