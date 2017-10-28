
exports.up = function(knex, Promise) {
    return Promise.all([

  		knex.schema
				.createTable('article', function(table) {
          table.increments('id').primary();
          table.string('title');
          table.string('url');
          table.integer('userId').unsigned();
          table.foreign('userId').references('users.id').onDelete('cascade');
      }),

			knex.schema
				.createTable('books', function(table) {
          table.string('id').primary();
          table.string('title');
          table.integer('userId').unsigned();
          table.foreign('userId').references('users.id').onDelete('cascade');
      	}),

    	knex.schema
    		.createTable('videos', function(table) {
          table.string('id').primary();
          table.string('title');
 				 	table.integer('userId').unsigned();
 				 	table.foreign('userId').references('users.id').onDelete('cascade');
    	}),

    	knex.schema
    		.createTable('diaryRecords', function(table) {
          table.increments('id').primary();
          table.string('title');
          table.timestamp('date').defaultTo(knex.fn.now());
          table.specificType('keywords', knex.raw('varchar(255) ARRAY'));
 				 	table.integer('userId').unsigned();
 				 	table.foreign('userId').references('users.id').onDelete('cascade');
    	}),

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema
		  .dropTable('diaryRecords')
		  .dropTable('videos')
		  .dropTable('books')
		  .dropTable('articles')
   ]);
};
