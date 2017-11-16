import express from 'express';
import passport from 'passport';

import * as authController from '../controllers/authController'; 
import { generateToken, sendToken } from '../passport/token';


const router = express.Router();

// Log in an existing user or sign him up
// if the user doesn't exist
router.post('/api/auth/fb',
	passport.authenticate('facebook-token', { session: false }),
	(req, res, next) => {
		if (!req.user) {
      return res.send(401, 'Not authenticated');
    } 
    next();  
	}, generateToken, sendToken
);


export default router;
