import hash from 'string-hash';

import redisClient from './';


export const getCachedVideos = (req, res, next) => {

  const { textQuery } = req.query;
  
  if (textQuery == null) {
    res.status(400).send('Missing parameter: textQuery');
  }

  console.log('GETTING CACHED VIDEOS')

  const hashedText = hash(textQuery+'videos');

  redisClient.get(hashedText, (err, data) => {
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

export const cacheVideos = (textQuery, videos) => {
  return new Promise((resolve, reject) => {
    const hashedText = hash(textQuery+'videos'); // long textQuery into a short hash
    const serializedVideos = JSON.stringify(videos); // array to string
    const expiresIn = 60*60*6 // 6 hours in seconds
    
    redisClient.setex(hashedText, expiresIn, serializedVideos, (err, reply) => {
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
