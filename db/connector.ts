import { MongoClient, Db } from "mongodb";

let client: MongoClient;

export async function connect(uri: string) {
  client = new MongoClient(uri);
  await client.connect();
}

export async function getDatabases() {
  const admin = client.db().admin();
  const result = await admin.listDatabases();
  return result.databases;
}

export async function getDBStats(dbName: string) {
  const db: Db = client.db(dbName);
  const stats = await db.stats();
  const collections = await db.listCollections().toArray();

  const collectionsStats = await Promise.all(
    collections.map(async (collection) => {
      const collStats = await db.command({ collStats: collection.name });
      return {
        name: collection.name,
        count: collStats.count,
        size: collStats.size,
      };
    })
  );

  return {
    dbStats: stats,
    collections: collectionsStats,
  };
}
