"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.getDb = getDb;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "fascodb";
let client = null;
let db = null;
async function connectToDatabase() {
    if (db && client)
        return { client, db };
    const mongo = new mongodb_1.MongoClient(uri);
    await mongo.connect();
    client = mongo;
    db = mongo.db(dbName);
    return { client, db };
}
function getDb() {
    if (!db)
        throw new Error("Database not initialized. Call connectToDatabase() first.");
    return db;
}
async function disconnectFromDatabase() {
    if (client)
        await client.close();
    client = null;
    db = null;
}
