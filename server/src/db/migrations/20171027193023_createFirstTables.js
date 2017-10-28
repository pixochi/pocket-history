
exports.up = function(knex, Promise) {
  return Promise.all([

  		knex.schema
				.createTable('users', function(table) {
          table.increments('id').primary();
          table.string('socialId').unique();
          table.string('provider');
          table.string('firstName');
          table.string('lastName');
          table.string('email').unique();
          table.string('image');
          table.timestamp('createdAt').defaultTo(knex.fn.now());
      }),

			knex.schema
				.createTable('questions', function(table) {
          table.increments('id').primary();
          table.text('content');
          table.dateTime('date');
          table.timestamp('createdAt').defaultTo(knex.fn.now());
      	})
      	.createTable('answers', function(table) {
          table.increments('id').primary();
          table.string('content');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.integer('questionId').unsigned();
 				 	table.foreign('questionId').references('questions.id').onDelete('cascade');
 				 	table.integer('userId').unsigned();
 				 	table.foreign('userId').references('users.id').onDelete('cascade');
      }),

  ]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
    knex.schema
	  .dropTable('answers')
	  .dropTable('questions')
	  .dropTable('users')
    ]);
};
