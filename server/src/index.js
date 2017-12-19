import express from 'express';
import bodyParser from 'body-parser';
import cluster from 'cluster';
import cors from 'cors';
import passport from 'passport';
import schedule from 'node-schedule';

import CONFIG from './config.json';
import { sendRandomFactNotification } from './api/controllers/notificationsController';
import authRoute from './api/routes/auth';
import booksRoute from './api/routes/books';
import factsRoute from './api/routes/facts';
import newsRoute from './api/routes/news';
import notificationsRoute from './api/routes/notifications';
import videosRoute from './api/routes/videos';
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
	res.status(200).send('Server running');
});

app.use(authRoute);
app.use(booksRoute);
app.use(factsRoute);
app.use(newsRoute);
app.use(notificationsRoute);
app.use(videosRoute);
app.use(wikiImagesRoute);

app.get('*', (req, res) => res.status(404).send('PAGE NOT FOUND'));

const rule = new schedule.RecurrenceRule();
rule.hour = [7, 14, 21];
// rule.minute = [new schedule.Range(0, 59)];
rule.minute = 10;
const notificationScheduler = schedule.scheduleJob(rule, () => {
	if(!cluster.worker || cluster.worker && cluster.worker.id === 1 ){
		sendRandomFactNotification();
	}
});

app.listen(PORT , () => {
	console.log(`Server is now running on http://localhost:${PORT}`);
});


