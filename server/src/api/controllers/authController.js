import axios from 'axios';

import knex from '../../db';


export const fbLogIn = async (req, res) => {

}

export const upsertFbUser = (accessToken, refreshToken, userId, cb) => {
	knex.select('*')
		.from('users')
		.where('socialId', userId)
		.andWhere('provider', 'fb')
		.first()
		.then(foundUser => {
			if (foundUser) {
				cb(null, foundUser);
			} else {
				const savedUser = saveFbUser(accessToken);
				if (!savedUser) {
					cb(err, null);
				}
				cb(null, savedUser);
			}
		})
		.catch(err => {
			cb(err, null);
		});
 };

const saveFbUser = async (token) => {
 	const fields = ['id', 'first_name', 'last_name', 'email'].join(',');
 	try {
	 	const response = await axios(`https://graph.facebook.com/me?fields=${fields}&access_token=${token}`);
	 	const { id, first_name, last_name, email } = await response.json();
	 	const newUser = {
	 		token,
	 		email,	
	 		firstName: first_name,
	 		lastName: last_name,
	 		socialId: id,
	 		provider: 'fb',
	 	}
 		const createdUser = await knex('users').insert(newUser).returning('*');
 		return createdUser;
 	} catch(e) {
 		console.log(e);
 		return null;
 	}	
}

  // export const upsertFbUser = (accessToken, refreshToken, cb) => {
  //   var that = this;
  //   return this.findOne({
  //         'facebookProvider.id': profile.id
  //   }, function(err, user) {
  //     // no user was found, lets create a new one
  //     if (!user) {
  //           var newUser = new that({
  //                 email: profile.emails[0].value,
  //                 facebookProvider: {
  //                       id: profile.id,
  //                       token: accessToken
  //                 }
  //           });

  //           newUser.save(function(error, savedUser) {
  //             if (error) {
  //                   console.log(error);
  //             }
  //             return cb(error, savedUser);
  //       });
  //     } else {
  //           return cb(err, user);
  //     }
  //   });
  // };

