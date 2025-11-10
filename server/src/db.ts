import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "fascodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (db && client) return { client, db };
  const mongo = new MongoClient(uri);
  await mongo.connect();
  client = mongo;
  db = mongo.db(dbName);
  return { client, db };
}

export function getDb(): Db {
  if (!db)
    throw new Error(
      "Database not initialized. Call connectToDatabase() first."
    );
  return db;
}

export async function disconnectFromDatabase() {
  if (client) await client.close();
  client = null;
  db = null;
}
