import { Db, GridFSBucket, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB || "ibs_tracker";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
};

async function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClient) {
    const client = new MongoClient(uri);
    await client.connect();
    globalForMongo._mongoClient = client;
  }
  return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db(dbName);
}

export async function getBucket(): Promise<GridFSBucket> {
  return new GridFSBucket(await getDb(), { bucketName: "uploads" });
}
