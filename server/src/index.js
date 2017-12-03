import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport'

import db from './db'; //database connection
import passportStrategies from './api/passport';
import booksRoute from './api/routes/books';
import factsRoute from './api/routes/facts';
import videosRoute from './api/routes/videos';
import authRoute from './api/routes/auth';
import newsRoute from './api/routes/news';
import wikiImagesRoute from './api/routes/wikiImages';


const { PORT = 8800 } = process.env;

const app = express();
app.enable('trust proxy');
const corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
	// db('users').where('id', 16).del().then(() => console.log('deleted'));
	res.status(200).send('Server running');
});

app.use(authRoute);
app.use(booksRoute);
app.use(factsRoute);
app.use(videosRoute);
app.use(newsRoute);
app.use(wikiImagesRoute);


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


