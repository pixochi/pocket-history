import express from 'express';

import * as videosController from '../controllers/videosController'; 
import { getCachedVideos } from '../../cache/videos';


const router = express.Router();

// GET: books for the selected fact
router.get('/api/videos', getCachedVideos, videosController.getVideos);


export default router;
