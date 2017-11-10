import express from 'express';

import * as booksController from '../controllers/booksController'; 
import { getCachedBooks } from '../../cache/books';


const router = express.Router();

// GET: books for the selected fact
router.get('/api/books', getCachedBooks, booksController.getBooks);


export default router;
