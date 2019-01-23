exports.seed = function(knex, Promise) {
  return knex('action')
    .truncate()
    .then(function() {
      return knex('action').insert([
        {
          description: 'Charge phone',
          notes: 'Remember adaptor',
          completed: false,
          action_id: 4
        },
        {
          description: 'Get cash',
          notes: 'Go to the ATM',
          completed: false,
          action_id: 5
        },
        {
          description: 'Pay co-working space',
          notes: 'Give them the dollar bills',
          completed: false,
          action_id: 4
        }
      ]);
    });
};
