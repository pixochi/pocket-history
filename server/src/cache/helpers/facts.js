import _ from 'lodash';

import hash from 'string-hash';
import redisClient from '../';


export const getCachedFacts = (date) => {
	return new Promise((resolve, reject) => {
		if (date == null || typeof date !== 'string') {
    	reject('Missing parameter: date');
  	}

  	// check if the date is in the correct format - MM/DD
	  const correctDate = date.match(/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/);

	  if (!correctDate) {
	    reject('Wrong date format');
	  }

	  console.log('GETTING CACHED FACTS')
	  console.log(date)
	  const hashedKey = hash(date+'facts');

	  redisClient.get(hashedKey, (err, data) => {
	    if (err){
	      console.log(err);
	      reject(err);
	    }

	    if (!data) {
	    	resolve(null);
	    }

	    data = JSON.parse(data);
	    resolve(data);
	  });
	});
}