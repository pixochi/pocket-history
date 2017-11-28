import axios from 'axios';
import qs from 'qs'; // querystring
import _ from 'lodash';

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheWikiImages } from '../../cache/wikiImages';


const WIKI_API_ROOT_URL = 'https://en.wikipedia.org/w/api.php?';

export const getWikiImages = async (req, res) => {
	console.log('GETTING WIKI IMAGES FROM API');

	const { pageTitles } = req.query;
	if (pageTitles == null) {
		res.status(400).send('Missing parameter: pageTitles');
	}

	const queryParams = {
		action: 'query',
		prop: 'pageimages',
		format: 'json',
		titles: pageTitles
	}
	const query = qs.stringify(queryParams);
	const apiUrl = `${WIKI_API_ROOT_URL}${query}`;

	try {

		const { data } = await axios(apiUrl);
		const { pages } = data.query;

		console.log('PAGES')
		console.log(pages)

		if (!_.isEmpty(pages['-1'])){
			res.send([]);
		} else {
			// return only info for getting images
			const imagesData = _.mapValues(pages, page => {
				const { title, thumbnail } = page;
				
				let imgInfo = { title }

				if (thumbnail) {
					const { source } = thumbnail;

					// get only the part which is unique for each image
					const match = source.match(/(en|commons)\/thumb\//);
					let img = source.slice(match.index);

					// replace en|commons with e|c and remove 'thumb' from the path
					img = img.slice(0,1) + img.slice(match[1].length);
					img = img.replace(/([ec])\/thumb\//,'$1/');

					imgInfo.src = img;
				}

				return imgInfo;
			});

			await cacheWikiImages(pageTitles, imagesData);
			res.send(imagesData);
		}	
	} catch(err) {
		console.log('GET WIKI IMAGES FROM API ERROR:')
		console.log(err)
		const error = {
			err,
			message: 'Failed to load the images. Please try again later.'
		}
		res.status(400).send(error);
	}
}