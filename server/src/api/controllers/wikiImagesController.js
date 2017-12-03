import axios from 'axios';
import qs from 'qs'; // querystring
import _ from 'lodash';

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheFacts } from '../../cache/facts';
import { getCachedFacts } from '../../cache/helpers/facts';
import { cacheWikiImages } from '../../cache/wikiImages';
import { addImagesToFacts } from '../../utils/images';


const WIKI_API_ROOT_URL = 'https://en.wikipedia.org/w/api.php?';
const IMG_SIZE = '170';

export const getWikiImages = async (req, res) => {
	console.log('GETTING WIKI IMAGES FROM API');

	const IMAGES_API_LIMIT = 50;
	const { pageTitles, date, category } = req.query;

	_.forEach({pageTitles, date, category}, (value, key) => {
		if (value == null) {
			res.status(400).send('Missing parameter: ' + key);
		}
	})

	let queryParams = {
		action: 'query',
		prop: 'pageimages',
		format: 'json',
	}

	let images = {};
	const titles = pageTitles.split('|');
	const uniqueTitles = _.uniq(titles);

	// there is never more than 750 facts in one category
	const safetyCounter = 15;
	let counter = 0;

	// get images for all titles
	// limit is 50 per 1 request
	while ((counter < safetyCounter) && (Object.keys(images).length < uniqueTitles.length) ) {
		counter++;
		const imagesLength = Object.keys(images).length;
		const pageTitlesParam = titles.slice(imagesLength, imagesLength + IMAGES_API_LIMIT).join('|');

		queryParams.titles = pageTitlesParam;
		const query = qs.stringify(queryParams);
		const apiUrl = `${WIKI_API_ROOT_URL}${query}`;

		try {
			const { data } = await axios(apiUrl);
			const { pages } = data.query;

			if (!_.isEmpty(pages['-1'])) {
				break;
			}

			images = { ...images, ...pages }
			console.log(images)

		} catch(err) {
				console.log('GET WIKI IMAGES FROM API ERROR:')
				console.log(err)
				const error = {
					err,
					message: 'Failed to load the images. Please try again later.'
				}

				res.status(400).send(error);
				break;
		}
	}

	try {
		// add images to facts
		let cachedFacts = await getCachedFacts(date);
		if (_.isEmpty(cachedFacts)) {
			res.status(400).send(null);
		}

		cachedFacts.data[category] = addImagesToFacts(images, cachedFacts.data[category]);
		let imagesMeta = cachedFacts.data.images || {};
		imagesMeta[category] = true;
		cachedFacts.data = { ...cachedFacts.data, images: imagesMeta };
		res.send(cachedFacts);
		cacheFacts(date, cachedFacts);
	} catch(e) {
		console.log(e);
		res.status(400).send(e);
	}
}