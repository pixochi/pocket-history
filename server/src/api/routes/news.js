import express from 'express';

import * as newsController from '../controllers/newsController'; 
import { getCachedNews } from '../../cache/news';


const router = express.Router();

// latest news
router.get('/api/news', getCachedNews, newsController.getNews);


export default router;
