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


app.get('/users', (req, res) => {
	db('users')
		.then((users) => { res.send(visits); })
		.catch(err => res.send(err));
});


app.listen(PORT , () => {
	console.log(`Server is now running on http://localhost:${PORT}`);
});


