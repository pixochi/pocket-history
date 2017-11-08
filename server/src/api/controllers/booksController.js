import axios from 'axios';
import qs from 'qs'; // querystring

import config from '../../../config.json';


const GOOGLE_API_KEY = config.googleAPI.key;
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes?';

export const getBooksForOneFact = async(req, res) => {
	const { textQuery } = req.query;
	const queryParams = {
		q: textQuery,
		projection: 'lite',
		key: GOOGLE_API_KEY
	};
	const query = qs.stringify(queryParams);
	const apiUrl = `${GOOGLE_BOOKS_API_URL}${query}`;

	try {
		const { data: { items } } = await axios(apiUrl);

		if (!items) {
			res.status(404).send('No books found.');
		}

		const books = items.map(book => ({
			id: book.id,
			title: book.volumeInfo.title,
			image: book.volumeInfo.imageLinks.smallThumbnail,
			textSnippet: book.searchInfo.textSnippet,
			previewLink: book.volumeInfo.previewLink,
			infoLink: book.volumeInfo.canonicalVolumeLink
		}));
		res.status(200).send(books);
	} catch(e) {
		console.log(e);
		res.status(400).send('Failed to load the books. Please try again later.');
	}
}