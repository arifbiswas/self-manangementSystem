import { DB } from "@/mongodb/mongodb.config";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { db } = await DB();
  const rowdb = db.collection("row");
  const rows = await rowdb
    .find({
      collection_id: context.params.id,
    })
    .toArray();
  return Response.json({ success: true, rows });
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
    console.log(error);
  }
}

export async function PATCH(
  request: Request,
  context: { params: { id: string } }
) {
  const { db } = await DB();
  const rowdb = db.collection("row");
  console.log("object POST request");
  const row = await request.json();
  // console.log(collection);
  delete row._id;
  await rowdb.updateOne(
    { _id: new ObjectId(context.params.id) },
    {
      $set: {
        ...row,
      },
    }
  );

  return Response.json({
    success: true,
    message: "update successfully",
  });
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { db } = await DB();
    const rowdb = db.collection("row");
    await rowdb.deleteOne({ _id: new ObjectId(context.params.id) });
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error: error });
  }
}
