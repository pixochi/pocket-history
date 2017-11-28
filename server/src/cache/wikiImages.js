import hash from 'string-hash';

import redisClient from './';


export const getCachedWikiImages = (req, res, next) => {

  const { pageTitles } = req.query;
  
  if (!pageTitles) {
    res.status(400).send('Missing parameter: pageTitles');
  }

  console.log('GETTING CACHED IMAGES')

  const hashedText = hash(pageTitles);

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

// @param titlesString string - all titles for which images are requested
//  separated by a single pipe "|" - title1|title2|title3
// @param images obj[] - { title: '', src: '' }
export const cacheWikiImages = (titlesString, images) => {
  return new Promise((resolve, reject) => {
    const hashedText = hash(titlesString); // long textQuery into a short hash
    const serializedImages = JSON.stringify(images); // array to string
    const expiresIn = 60*60*6 // 6 hours in seconds
    
    redisClient.setex(hashedText, expiresIn, serializedImages, (err, reply) => {
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
