import axios from 'axios';

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheFacts } from '../../cache/facts';


const FACTS_API_RUL = 'http://history.muffinlabs.com/date/';


export const getFacts = async (req, res) => {
	console.log('GETTING FACTS FROM API');

	const requestDate = req.query.date;
	if (requestDate == null) {
		res.status(400).send('Missing parameter: date');
		return;
	}

	const apiUrl = FACTS_API_RUL + requestDate;

	try {
		const { data } = await axios(apiUrl);

		res.send(data);
		cacheFacts(requestDate, data);
		
	} catch(err) {
		console.log('GET FACTS FROM API ERROR:')
		console.log(err)
		const error = {
			err,
			message: 'Failed to load the facts. Please try again later.'
		}
		res.status(400).send(error);
	}
}