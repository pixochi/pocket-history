import express from 'express';

import * as wikiImagesController from '../controllers/wikiImagesController'; 
import { getCachedWikiImages } from '../../cache/wikiImages';


const router = express.Router();

// getCachedWikiImages - add this middleware
// GET: books for the selected fact
router.get('/api/wikiImages', getCachedWikiImages, wikiImagesController.getWikiImages);


export default router;
