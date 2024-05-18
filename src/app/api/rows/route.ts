import { DB } from "@/mongodb/mongodb.config";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const { db } = await DB();
    const rowdb = db.collection("row");
    const rows = await rowdb.find({}).toArray();
    return Response.json({ success: true, rows });
  } catch (error) {
    return Response.json({
      success: false,
      error: error,
    });
  }
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  try {
    const { db } = await DB();
    const rowdb = db.collection("row");
    console.log("object POST request");
    const row = await request.json();
    // console.log(collection);
    await rowdb.insertOne(row);

    return Response.json({
      success: true,
      message: "create successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
    });
  }
}
