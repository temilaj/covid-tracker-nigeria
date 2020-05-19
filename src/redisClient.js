const { promisify } = require('util');
const redis = require('redis');

const config = require('../config');

const redisClient = redis.createClient(config.redis.port);
const getData = promisify(redisClient.get).bind(redisClient);
const setData = redisClient.setex.bind(redisClient);

redisClient.on('error', err => {
  console.error('Error ' + err);
});

module.exports = { setData, getData };
