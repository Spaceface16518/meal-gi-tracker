import { MongoClient } from "mongodb";

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.MONGODB_DB || "ibs_tracker";

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  const now = new Date();

  await db.collection("entries").insertMany([
    {
      ts: now,
      type: "gi_event",
      userId: "me",
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
      userId: "me",
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

  console.log("Seed data inserted");
  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
