const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || null;
let client = null;
let db = null;

async function connect() {
  if (!uri) {
    console.warn('MONGODB_URI not set; skipping DB connection. Set MONGODB_URI in backend/.env to enable DB.')
    return null;
  }
  if (client) return db;

  client = new MongoClient(uri, {
    maxPoolSize: parseInt(process.env.MONGODB_MAX_POOL_SIZE, 10) || 10
  });

  await client.connect();
  db = client.db(process.env.MONGODB_DB || 'bandhu');
  console.log('Connected to MongoDB:', db.databaseName);
  return db;
}

function getDb() {
  return db;
}

module.exports = { connect, getDb };
