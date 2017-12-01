import hash from 'string-hash';
import _ from 'lodash';

import redisClient from './';
import { optimizeImageSource, getFullImageSource } from '../utils/images';


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

    data = JSON.parse(data) 

    if (data != null && data.length !== 0 ) {

      data = Object.keys(data).map(key => {
        let imageInfo = data[key];

        if (!imageInfo) { return {}; }

        imageInfo.src = getFullImageSource(imageInfo.src);
        return imageInfo;
      });

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

    if (!titlesString || images == null) { 
      reject('Titles or images are empty.'); 
    }

    const hashedText = hash(titlesString); // long textQuery into a short hash

    images = _.mapValues(images, imageInfo => {
      if (!imageInfo.src) { return imageInfo; }

      imageInfo.src = optimizeImageSource(imageInfo.src);
      return imageInfo;
    });

    console.log('IMAGES AFTER OPTIMIZING')
    console.log(images)

    const serializedImages = JSON.stringify(images);
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
