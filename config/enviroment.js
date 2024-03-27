require('dotenv').config()

module.exports = env = {
  MONGODB_URI: process.env.MONGODB_URI,
  APP_HOST : process.env.APP_HOST,
  APP_PORT : process.env.APP_PORT,
  AUTHOR : process.env.AUTHOR
}