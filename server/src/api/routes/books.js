import express from 'express';

import * as booksController from '../controllers/booksController'; 


const router = express.Router();

// GET: books for the selected fact
router.get('/api/booksForOneFact', booksController.getBooksForOneFact);


export default router;
