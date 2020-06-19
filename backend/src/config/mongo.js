export default {
  driver: 'mongodb',
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  database: process.env.MONGO_NAME,
};
