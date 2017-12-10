import * as admin from 'firebase-admin';
import serviceAccount from '../notifications-account.json';

if (!admin.apps.length) {
	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: 'https://postgres-test-184119.firebaseio.com/'
	});
}

export default admin;