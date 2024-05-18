import { MongoClient, Db } from "mongodb";

// Replace the uri string with your connection string.
const uri: string = process.env.NEXT_PUBLIC_BACKEND_API || "";

interface IDbProps {
  db: Db;
}

const client = new MongoClient(uri);

export const DB = async (): Promise<IDbProps> => {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("seft-management-system");

    return { db };
  } catch (error) {
    console.log("Connected fail to server");
    console.log(error);
    throw error;
  }
};
