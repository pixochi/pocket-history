import Expo from 'expo-server-sdk';
import axios from 'axios';
import * as admin from 'firebase-admin';

import firebase from '../../firebase';
import { getRandomFact } from './factsController';
import CONFIG from '../../config.json';
import { addLeadingChars } from '../../utils/string';


export const saveToken = async (req, res) => {
	const { token } = req.body;
	const existingToken = await tokenExists(token);

	if (existingToken) {
		res.status(200).send({ status: 'OK' });
		return; 
	}

	const tokensRef = firebase.database().ref('pushTokens');

	tokensRef.push({ token })
	.then(() => {
		res.send({ status: 'OK' });
	})
	.catch(e => {
		console.log(e);
		res.status(400).send(e);
	});	
}

export const getAllTokens = () => {
  return new Promise((resolve, reject) => {
    const ref = firebase.database().ref('pushTokens');

    ref.on("value", (snapshot) => {
      const allTokens = snapshot.val();
      resolve(allTokens);
    }, (errorObject) => {
      console.log("Failed to get all tokens: " + errorObject.code);
      reject(errorObject);
    });
  });
}

export const sendNotificationsOnRequest = async (req, res) => {

	let { body, timestamp, category, key } = req.query;
	let data = { category, timestamp }

	if (key !== CONFIG.notificationsKey) { 
		res.status(401).send('Unauthorized');
		return; 
	}

	if (!body || !timestamp || !category) {
		const randomFact = await getRandomNotificationFact();
		body = randomFact.body;
		data = randomFact.data;
	}
	
	try {
		await sendNotifications(body, data);
		res.status(200).send();
	} catch(e) {
		console.log(e);
		res.status(400).send('Failed to send notifications:' + e.message);
	}
}

export const getRandomNotificationFact = async () => {
	const randomFact = await getRandomFact();
	const { year, text, category, timestamp } = randomFact;
	const date = new Date(timestamp);
	let month = date.getMonth() + 1;
	let day = date.getDate();

	month = addLeadingChars(month, 2, '0');
	day = addLeadingChars(day, 2, '0');
	const body = `${day}/${month}/${year} - ${text}`;

	return {
		body,
		data: {
			category,
			timestamp
		}
	}
}

export const sendNotifications = async (body, data) => {
	const allTokens = await getAllTokens();

  if (!allTokens) { return; }

  const tokenValues = Object.values(allTokens);

  // Create a new Expo SDK client
  let expo = new Expo();

  // Create the messages that you want to send to clents
  let messages = [];
  for (let { token } of tokenValues) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
      to: token,
      sound: 'default',
      body,
      data,
    })
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);

  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        deleteNotRegistered(chunk, receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

export const sendRandomFactNotification = async () => {
	try {
		const { body, data } = await getRandomNotificationFact();
   	sendNotifications(body, data);
	} catch(e) {
		console.log(e);
	}
}

const tokenExists = (token) => {
	return new Promise((resolve, reject) => {
		const ref = firebase.database().ref('pushTokens');

		try {
			ref.orderByChild("token").equalTo(token).on('value', snapshot => {
		    const tokenVal = snapshot.val();
		    resolve(tokenVal);
			});
		} catch(e) {
			console.log(e);
			reject('Failed to check if token exists:' + e);
		}
	});	
}

const deleteToken = (token) => {
	return new Promise((resolve, reject) => {
		const ref = firebase.database().ref('pushTokens');

		try {
			ref.orderByChild('token').equalTo(token).once('value', snapshot => {
		     let updates = {};
		     snapshot.forEach(child => updates[child.key] = null);
		     ref.update(updates);
		     resolve(token);
			});
		} catch(e) {
			console.log(e);
			reject(`Failed to delete token "${token}".`);
		}
	});	
}

// deletes all tokens from DB which are not 
// associated with any device
// @param chunk obj[] - notification objects containig a receiver's token
// @param receipts obj[] - result of expo.sendPushNotificationsAsync()
const deleteNotRegistered = (chunk, receipts) => {
	if (!chunk || !receipts) { return; }

	receipts.forEach((receipt, i) => {
		const { details } = receipt;
		const deviceNotRegistered = details && details.error === 'DeviceNotRegistered';
		if (deviceNotRegistered) {
			const deviceToken = chunk[i].to;
			deleteToken(deviceToken);
		}
	});
}




