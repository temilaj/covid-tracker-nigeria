const { promisify } = require('util');
const redis = require('redis');

const config = require('../config');

const port = config.redis.port || process.env.REDISCLOUD_URL;
const redisClient = redis.createClient(port);
const getData = promisify(redisClient.get).bind(redisClient);
const setData = redisClient.setex.bind(redisClient);

redisClient.on('error', err => {
  console.error('Error ' + err);
});

module.exports = { setData, getData };
