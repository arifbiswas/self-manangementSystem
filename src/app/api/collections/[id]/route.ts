import { DB } from "@/mongodb/mongodb.config";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    const { db } = await DB();
    const collectiondb = db.collection("collection");
    const collection = await collectiondb.findOne({
      _id: new ObjectId(context.params.id),
    });

    // console.log(collection);
    return Response.json({ success: true, collection });
  } catch (error) {
    return Response.json({ success: false, error: error });
  }
}
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { db } = await DB();
    const collectiondb = db.collection("collection");
    const rowdb = db.collection("row");
    await rowdb.deleteMany({ collection_id: context.params.id });
    await collectiondb.deleteOne({ _id: new ObjectId(context.params.id) });
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error: error });
  }
}
