import axios from 'axios';
import qs from 'qs'; // querystring
import _ from 'lodash';

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheWikiImages } from '../../cache/wikiImages';
import { sortByTitles } from '../../utils/images';


const WIKI_API_ROOT_URL = 'https://en.wikipedia.org/w/api.php?';
const IMG_SIZE = '160';
const IMG_FORMATS = ['jpg', 'png', 'jpeg', 'svg', 'gif', 'JPG', 'PNG', 'JPEG', 'SVG', 'GIF', 'tif'];

export const getWikiImages = async (req, res) => {
	console.log('GETTING WIKI IMAGES FROM API');

	const { pageTitles } = req.query;
	if (pageTitles == null) {
		res.status(400).send('Missing parameter: pageTitles');
	}

	let queryParams = {
		action: 'query',
		prop: 'pageimages',
		format: 'json',
	}

	let images = {};
	const titles = pageTitles.split('|');

	while (Object.keys(images).length < titles.length) {
		const imagesLength = Object.keys(images).length;
		const pageTitlesParam = titles.slice(imagesLength, imagesLength + 50).join('|');

		queryParams.titles = pageTitlesParam;
		const query = qs.stringify(queryParams);
		const apiUrl = `${WIKI_API_ROOT_URL}${query}`;

		try {
			const { data } = await axios(apiUrl);
			const { pages } = data.query;

			if (!_.isEmpty(pages['-1'])) {
				res.send([]);
				break;
			} else {
				images = { ...images, ...pages }
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

	// return only basic info about images
		let imagesData = Object.keys(images).map(pageId => {
			const { title, thumbnail } = images[pageId];
			
			let imgInfo = {};
			imgInfo.title = title;

			if (thumbnail && thumbnail.source) {
				const { source } = thumbnail;
				
				// change size of the requested image
				const pattern = new RegExp(`.(${IMG_FORMATS.join('|')})\/(\\d+)`);
				imgInfo.src = source.replace(pattern, '.$1/'+IMG_SIZE);
			}

			return imgInfo;
		});

		// sort imagesData in the same order as they were requested
		imagesData = sortByTitles(imagesData, titles);

		res.send(imagesData);
		cacheWikiImages(pageTitles, imagesData);
}