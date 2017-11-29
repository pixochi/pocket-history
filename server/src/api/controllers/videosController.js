import axios from 'axios';
import qs from 'qs'; // querystring

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheVideos } from '../../cache/videos';
import { optimizeQuery } from '../../utils/query';


const YTB_API_KEY = CONFIG.youtube.key;
const YTB_API_URL = 'https://www.googleapis.com/youtube/v3/search?';

export const getVideos = async (req, res) => {
	console.log('GETTING VIDEOS FROM API');

	const { textQuery } = req.query;
	if (textQuery == null) {
		res.status(400).send('Missing parameter: textQuery');
	}

	const q = optimizeQuery(textQuery);
	const queryParams = {
		q,
		part: 'snippet',
		type: 'video',
		maxResults: 10,
		key: YTB_API_KEY
	}
	const query = qs.stringify(queryParams);
	const apiUrl = `${YTB_API_URL}${query}`;

	try {
		// data doesn't have a field 'items'
		// if no videos were found
		const { data: {items} } = await axios(apiUrl);

		// no videos found
		if (!items){
			res.send([]);
		} else {
			// return only videoIds and titles
			const videos = items.map(video => (
				{
					id: video.id.videoId,
					title: video.snippet.title
				}
			));

			res.send(videos);
			cacheVideos(textQuery, videos);

		}	
	} catch(err) {
		console.log('GET VIDEOS FROM API ERROR:')
		console.log(err)
		const error = {
			err,
			message: 'Failed to load the videos. Please try again later.'
		}
		res.status(400).send(error);
	}
}