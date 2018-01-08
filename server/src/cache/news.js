import hash from 'string-hash';

import redisClient from './';


export const getCachedNews = (req, res, next) => {

  console.log('GETTING CACHED NEWS');

  redisClient.get('news', (err, data) => {
    if (err){
      console.log(err);
      next();
    } 

    if (data != null && data.length !== 0 ) {
      res.send(data);
    } else {
      next();
    }
  });
}

export const cacheNews = (news) => {
  return new Promise((resolve, reject) => {
    const serializedNews = JSON.stringify(news); // array to string
    const expiresIn = 60*60*6 // hours in seconds
    
    redisClient.setex('news', expiresIn, serializedNews, (err, reply) => {
      if (err) {
        console.log('ERROR SETTING CACHE:')
        console.log(err)
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}
