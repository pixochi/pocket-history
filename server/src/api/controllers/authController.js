import axios from 'axios';

import knex from '../../db';


export const upsertFbUser = (accessToken, refreshToken, profile, cb) => {
	knex.select('*')
		.from('users')
		.where('socialId', profile.id)
		.andWhere('provider', 'fb')
		.first()
		.then(foundUser => {
			if (foundUser) {
				cb(null, foundUser);
			} else {
				const savedUser = saveFbUser(accessToken);
				if (!savedUser) {
					cb('Failed to save the new user.');
				}
				cb(null, savedUser);
			}
		})
		.catch(e => {
			console.log(e);
			cb(e);
		});
}

const saveFbUser = async (token) => {
 	const fields = ['id', 'first_name', 'last_name', 'email'].join(',');
 	try {
	 	const response = await axios(`https://graph.facebook.com/me?fields=${fields}&access_token=${token}`);
	 	const { id, first_name, last_name, email } = response.data;
	 	const newUser = {
	 		token,
	 		email,	
	 		firstName: first_name,
	 		lastName: last_name,
	 		socialId: id,
	 		provider: 'fb'
	 	}
 		const createdUser = await knex('users').insert(newUser).returning('*');
 		return createdUser;
 	} catch(e) {
 		console.log(e);
 		return false;
 	}	
}

