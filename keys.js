require('dotenv').config();

exports.firebase = {
  key: process.env.FIREBASE_KEY,
  auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
  db_url: process.env.FIREBASE_DB_URL,
  proj_id: process.env.FIREBASE_ID,
  strg: process.env.FIREBASE_STRG,
  sender_id: process.env.FIREBASE_SENDER_ID
};
