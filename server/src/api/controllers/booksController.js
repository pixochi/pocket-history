import axios from 'axios';
import qs from 'qs'; // querystring

import CONFIG from '../../config.json';
import redisClient from '../../cache';
import { cacheBooks } from '../../cache/books';
import { optimizeQuery } from '../../utils/query';


const GOOGLE_API_KEY = CONFIG.googleAPI.key;
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes?';

export const getBooks = async(req, res) => {
	console.log('GETTING BOOKS FROM API');

	const { textQuery } = req.query;
	if (textQuery == null) {
		res.status(400).send('Missing parameter: textQuery');
	}

	const q = optimizeQuery(textQuery);
	const queryParams = {
		q,
		projection: 'lite',
		key: GOOGLE_API_KEY
	}
	const query = qs.stringify(queryParams);
	const apiUrl = `${GOOGLE_BOOKS_API_URL}${query}`;

	try {
		// data doesn't have a field 'items'
		// if no books were found
		const { data: {items} } = await axios(apiUrl);

		// no books found
		if (!items){
			res.send([]);
		} else {
			// return only the important fields of books
			const books = items.map(book => {
				const { searchInfo = {}, id } = book; // not all books contain searchInfo
				const { title, description, imageLinks = {},
					previewLink, canonicalVolumeLink } = book.volumeInfo;
				const { textSnippet } = searchInfo ;

				return {
					id,
					title,
					description,
					previewLink,
					textSnippet,
					image: imageLinks.smallThumbnail,
					infoLink: canonicalVolumeLink
				}
			});

			cacheBooks(textQuery, books).then(() => {
				res.send(books);
			}).catch(e => console.log(e));
		}	
	} catch(err) {
		console.log('GET BOOKS FROM API ERROR:')
		console.log(err)
		const error = {
			err,
			message: 'Failed to load the books. Please try again later.'
		}
		res.status(400).send(error);
	}
}