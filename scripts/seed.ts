import { MongoClient, ObjectId } from "mongodb";

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.MONGODB_DB || "ibs_tracker";
  const userIdRaw = process.env.SEED_USER_ID;
  const userId = userIdRaw && ObjectId.isValid(userIdRaw) ? new ObjectId(userIdRaw) : new ObjectId();

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const now = new Date();

  await db.collection("entries").insertMany([
    {
      ts: now,
      type: "gi_event",
      userId,
      input: {
        notes: "Bloating after lunch",
        fields: {
          severity: 4,
          locations: ["lower_abdomen", "bloating"]
        }
      },
      search: {
        text: "Bloating after lunch severity 4 lower abdomen"
      }
    },
    {
      ts: now,
      type: "bm",
      userId,
      input: {
        notes: "Morning BM",
        fields: {
          bristol: 4,
          color: "brown",
          urgency: false
        }
      },
      search: {
        text: "Morning BM bristol 4 brown"
      }
    }
  ]);

  console.log("Seed data inserted for userId:", userId.toHexString());
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
