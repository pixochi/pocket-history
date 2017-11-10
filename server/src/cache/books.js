import hash from 'string-hash';

import redisClient from './';


export const getCachedBooks = (req, res, next) => {

  const { textQuery } = req.query;
  if (textQuery == null) {
    res.status(400).send('Missing parameter: textQuery');
  }

  const hashedText = hash(textQuery);

  redisClient.get(hashedText, (err, data) => {
    if (err) console.log(err);

    if (data != null) {
      res.send(data);
    } else {
      next();
    }
  });
}

export const cacheBooks = (textQuery, books) => {
  return new Promise((resolve, reject) => {
    const hashedText = hash(textQuery); // long textQuery into a short hash
    const serializedBooks = JSON.stringify(books); // array to string
    const day = 60*60*24 // day in seconds
    
    redisClient.setex(hashedText, day, serializedBooks, (err, reply) => {
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
