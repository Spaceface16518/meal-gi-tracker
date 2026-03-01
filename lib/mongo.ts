import { Db, GridFSBucket, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "ibs_tracker";

type GlobalMongo = {
  client?: MongoClient;
};

const globalForMongo = globalThis as typeof globalThis & { _mongo?: GlobalMongo };

async function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongo) {
    globalForMongo._mongo = {};
  }

  if (!globalForMongo._mongo.client) {
    globalForMongo._mongo.client = new MongoClient(uri);
    await globalForMongo._mongo.client.connect();
  }

  return globalForMongo._mongo.client;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(dbName);
}

export async function getBucket(): Promise<GridFSBucket> {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: "uploads" });
}
