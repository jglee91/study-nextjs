const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: `mongodb+srv://jglee91:${process.env.DB_PASSWORD}@study.mtewc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
  },
};
