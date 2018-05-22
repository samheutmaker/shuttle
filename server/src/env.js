const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';
const HTTP_PORT = process.env.HTTP_PORT || '3000';
const JWT_TOKEN_SECRET = process.env.TOKEN_SECRET || 'CHANGE_ME_@#$%@$%@#$';
const API_TOKEN_SECRET = process.env.TOKEN_SECRET || 'CHANGE_ME_@#$%@3434$%@#$';

export {
  MONGO_DB_URL,
  HTTP_PORT,
  JWT_TOKEN_SECRET,
  API_TOKEN_SECRET,
}