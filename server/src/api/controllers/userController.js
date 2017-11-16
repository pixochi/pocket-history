import axios from 'axios';
import _ from 'lodash';

import knex from '../../db';


export const saveUser = (user) => {
	return new Promise((resolve, reject) => {
		if (_.isEmpty(user)) reject('User object is empty.');

		knex('users').insert(user).returning('*')
		.then(createdUser => resolve(createdUser))
		.catch(e => {
			console.log(e);
			reject('Failed to create the new user');
		});
	});
}

export const getUser = (fields = {}) => {
	return new Promise((resolve, reject) => {
		let query = knex('users').select('*').limit(1);
		_.keys(fields).forEach((key, i) => {
			if (i === 0) {
				query.where(key, fields[key]);
			} else {
				query.andWhere(key, fields[key]);
			}
		});
		query.then(foundUser => {
			if(!foundUser) resolve(false);
			resolve(foundUser[0]);
		})
		.catch(e => {
			console.log(e);
			reject(e);
		});
	});
	
}