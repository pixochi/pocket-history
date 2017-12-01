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

		// console.log('PAGES:')
		// console.log(pages)
		if (!_.isEmpty(pages['-1'])){
			res.send([]);
		} else {

			// return only info about images
			let imagesData = Object.keys(pages).map(pageId => {
				const { title, thumbnail } = pages[pageId];
				
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
			const titles = pageTitles.split('|');
			imagesData = sortByTitles(imagesData, titles);

			res.send(imagesData);
			cacheWikiImages(pageTitles, imagesData);
			
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