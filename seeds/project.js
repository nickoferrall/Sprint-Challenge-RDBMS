exports.seed = function(knex, Promise) {
  return knex('project')
    .truncate()
    .then(function() {
      return knex('project').insert([
        {
          name: 'Spanish conjugator',
          description: 'Create website that helps you to conjugate verbs',
          completed: false
        },
        {
          name: 'Labs',
          description: 'Build projects in a team',
          completed: false
        },
        {
          name: 'Win Wimbledon',
          description: 'Play a lot of tennis',
          completed: false
        }
      ]);
    });
};
