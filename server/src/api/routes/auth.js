import express from 'express';

import * as authController from '../controllers/authController'; 


const router = express.Router();

// GET: books for the selected fact
router.post('/api/auth/fb', authController.fbLogIn);


export default router;
