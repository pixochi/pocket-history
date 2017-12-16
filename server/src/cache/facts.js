import hash from 'string-hash';
import _ from 'lodash';

import redisClient from './';
import { getCachedFacts } from './helpers/facts';


export const getCachedFactsMiddleware = async (req, res, next) => {

  const { date } = req.query;

  try {
     const facts = await getCachedFacts(date);
     if (_.isEmpty(facts)) {
      next();
     } else {
      res.send(facts);
    }
  } catch(e) {
    console.log(e);
    next();
  }
}

export const cacheFacts = (date, facts) => {
  return new Promise((resolve, reject) => {

    console.log('CACHING FACTS')
    console.log(date)

    const serializedFacts = JSON.stringify(facts); // array to string
    const expiresIn = 60*60*6 // in seconds

    const hashedKey = hash(date+'facts');
    
    redisClient.setex(hashedKey, expiresIn, serializedFacts, (err, reply) => {
      if (err) {
        console.log('ERROR WHILE SAVING FACTS IN CACHE:')
        console.log(err)
        reject(err);
      } else {
        console.log('FACTS CACHED')
        resolve(reply);
      }
    });
  });
}
