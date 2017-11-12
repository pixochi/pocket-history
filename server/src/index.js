import express from 'express';
import bodyParser from 'body-parser';

import db from './db'; //database connection
import booksRoute from './api/routes/books';
import videosRoute from './api/routes/videos';


const { PORT = 8800 } = process.env;

const app = express();
app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
	res.status(200).send('Server running');
});

app.use(booksRoute);
app.use(videosRoute);

app.get('*', (req, res) => res.status(404).send('PAGE NOT FOUND'));

// FOR LATER USE
// app.get('/diary', (req, res) => {
// 	const record = {
// 		title: 'This day is over',
// 		keywords: ['google', 'connection', 'sql'],
// 		userId: 1
// 	}

// 	db('diaryRecords').insert(record)
// 		.then(() => {
// 			db('diaryRecords')
// 				.then(records => res.send(records))
// 		})
// 		.catch(err => res.send(err));
// });

// FOR LATER USE
// app.get('/users', (req, res) => {
// 	db('users')
// 		.then((users) => { res.send(users); })
// 		.catch(err => res.send(err));
// });

app.listen(PORT , () => {
	console.log(`Server is now running on http://localhost:${PORT}`);
});


