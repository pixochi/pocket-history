import redis from 'redis';

import CONFIG from '../config.json';


const client = redis.createClient(CONFIG.redis).
	on('error', (err) => console.error('ERR:REDIS:', err));


export default client;