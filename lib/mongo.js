// lib/mongo.js
const { MongoClient } = require("mongodb");

let cached = global._mongo || { client: null, db: null };
global._mongo = cached;

async function getDB() {
  if (cached.db) return cached.db;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");
  const client = cached.client ||= new MongoClient(uri, { maxPoolSize: 5 });
  if (!client.topology || !client.topology.isConnected?.()) {
    await client.connect();
  }
  const dbName =
    process.env.MONGODB_DB ||
    (new URL(uri).pathname.replace(/^\//, "") || "app");
  const db = client.db(dbName);
  // Helpful index (idempotent)
  try { await db.collection("users").createIndex({ emailLower: 1 }, { unique: true, sparse: true }); } catch {}
  cached.db = db;
  return db;
}

module.exports = { getDB };
