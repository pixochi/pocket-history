
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.string('token').notNull().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
    t.dropColumn('token');
  });
};
