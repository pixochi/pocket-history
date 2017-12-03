import express from 'express';

import * as wikiImagesController from '../controllers/wikiImagesController'; 
import { getCachedWikiImages } from '../../cache/wikiImages';


const router = express.Router();

// getCachedWikiImages - add this middleware
// GET: images for the selected facts
router.get('/api/wikiImages', wikiImagesController.getWikiImages);


export default router;
