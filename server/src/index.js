import express from 'express';
import bodyParser from 'body-parser';

import db from './db'; //database connection


const { PORT = 8000 } = process.env;

const app = express();
app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.status(200).send('Server running');
});

app.get('/diary', (req, res) => {
	const record = {
		title: 'This day is over',
		keywords: ['google', 'connection', 'sql'],
		userId: 1
	}

	db('diaryRecords').insert(record)
		.then(() => {
			db('diaryRecords')
				.then(records => res.send(records))
		})
		.catch(err => res.send(err));
});


app.get('/users', (req, res) => {
	db('users')
		.then((users) => { res.send(users); })
		.catch(err => res.send(err));
});


app.listen(PORT , () => {
	console.log(`Server is now running on http://localhost:${PORT}`);
});


