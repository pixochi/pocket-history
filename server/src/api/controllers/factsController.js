import axios from 'axios';

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheFacts } from '../../cache/facts';
import theLegend from '../special.js';


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
		let { data } = await axios(apiUrl);

		if (data) {
			if (requestDate === '5/5') {
				data = addLegendToFacts(data);
			}
			console.log(data)
			res.send(data);
			cacheFacts(requestDate, data);
		} else {
			res.send({});
		}
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

const addLegendToFacts = (data) => {

	let births = data.data.Births;
	let index = -1;
	let year = (parseInt(theLegend.year) + 1) + '';

	while(!index) {
		year = (parseInt(year) - 1) + '';
		index = births.findIndex(birth => birth.year === year);
	}

	const birthsWithLegend = [...births.slice(0, index), theLegend, ...births.slice(index)];

	data.data.Births = birthsWithLegend;

	return data;
}