import axios from 'axios';
import _ from 'lodash';
import xml2js from 'xml2js';

import knex from '../../db';
import { cacheNews } from '../../cache/news';


export const getNews = async (req, res) => {
	try {
		console.log('GETTING NEWS FROM RSS');
		const { data } = await axios.get('http://feeds.bbci.co.uk/news/world/rss.xml');
		const parserOptions = {
			trim: true,
			explicitArray: false
		}
		const xmlParser = xml2js.Parser(parserOptions);

		xmlParser.parseString(data, async (err, result) => {
			if (err) {
				res.status(500).send();
			}
			const articles = result.rss.channel.item;

			// extract the important fields from each article
			const optimizedArticles = articles.map(article => {
				const { title, description, link } = article;
				const img = article['media:thumbnail'] ? article['media:thumbnail']['$'].url : null;
				return {
					title,
					description,
					link,
					img
				}
			});
			await cacheNews(optimizedArticles);
			res.status(200).send(optimizedArticles);
		});
	} catch(e) {
		console.log(e);
		res.status(500).send(e);
	}	
}