const config = require(`./${process.env.NODE_ENV || 'development'}`); // eslint-disable-line import/no-dynamic-require
module.exports = config;
