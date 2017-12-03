import express from 'express';

import * as factsController from '../controllers/factsController'; 
import { getCachedFactsMiddleware } from '../../cache/facts';


const router = express.Router();

// GET: facts for the selected date
//getCachedFacts middleware
router.get('/api/facts', getCachedFactsMiddleware, factsController.getFacts);


export default router;
