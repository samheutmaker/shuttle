const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';
const HTTP_PORT = process.env.HTTP_PORT || '3000';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'CHANGE_ME_@#$%@$%@#$';

export {
  MONGO_DB_URL,
  HTTP_PORT,
  TOKEN_SECRET,
}