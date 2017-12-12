import express from 'express';

import * as notificationsController from '../controllers/notificationsController'; 


const router = express.Router();

router.get('/api/notifications', notificationsController.sendNotificationsOnRequest);
router.post('/api/notifications', notificationsController.saveToken);


export default router;
