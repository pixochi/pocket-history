import axios from 'axios';

import knex from '../../db';
import { getUser, saveUser } from './userController';


export const upsertFbUser = async (accessToken, refreshToken, profile, cb) => {
	const where = {
		socialId: profile.id,
		provider: 'fb'
	}
	const registeredUser = await getUser(where);
	
	if (registeredUser) {
		console.log('USER EXISTS');
		console.log(registeredUser);
		cb(null, registeredUser);
	} else {
		try {
			console.log('CREATING A NEW USER');
			const savedUser = await saveFbUser(accessToken);
			
			if (!savedUser) {
				cb('Failed to save the new user.');
			}
			cb(null, savedUser);
		} catch(e) {
			console.log(e)
			cb(e, false);
		}
		
	}
}

const saveFbUser = (token) => {
	return new Promise(async (resolve, reject) => {
		const fields = ['id', 'first_name', 'last_name', 'email'].join(',');
	 	try {
		 	const response = await axios(`https://graph.facebook.com/me?fields=${fields}&access_token=${token}`);

		 	const { id, first_name, last_name } = response.data;
		 	let email = response.data.email.toLowerCase();

		 	const userEmailExists = await getUser({ email });
		 	if (userEmailExists) {
		 		console.log('MAIL EXISTS');
		 		return reject('User with this email already exists.');
		 	}
		 	const newUser = {
		 		token,
		 		email,	
		 		firstName: first_name,
		 		lastName: last_name,
		 		socialId: id,
		 		provider: 'fb'
		 	}
	 		const createdUser = await saveUser(newUser);
	 		console.log('CREATED USER')
	 		console.log(createdUser)
	 		return resolve(createdUser);
	 	} catch(e) {
	 		console.log(e);
	 		return reject('Failed to log in with Facebook.');
	 	}	
	});
}

