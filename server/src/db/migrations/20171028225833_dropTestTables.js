
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema
	  	.dropTable('visits')
    ]);
};

exports.down = function(knex, Promise) {
  
};
