import { DB } from "@/mongodb/mongodb.config";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { db } = await DB();
  const collectiondb = db.collection("collection");
  const collections = await collectiondb.find({}).toArray();
  return Response.json({ success: true, collections });
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  try {
    const { db } = await DB();
    const collectiondb = db.collection("collection");
    console.log("object POST request");
    const collection = await request.json();
    // console.log(collection);
    await collectiondb.insertOne(collection);

    return Response.json({
      success: true,
      message: "create successfully",
    });
  } catch (error) {
    return Response.json({ success: false, error: error });
  }
}

export async function PATCH(request: Request) {
  const { db } = await DB();
  const collectiondb = db.collection("collection");
  console.log("object POST request");
  const collection = await request.json();
  // console.log(collection);
  await collectiondb.updateOne(
    { _id: new ObjectId(collection?._id) },
    {
      $set: {
        id: collection.id,
        title: collection.title,
        colums: collection.colums,
      },
    }
  );

  return Response.json({
    success: true,
    message: "update successfully",
  });
}

// export async function PATCH(request: Request) {}
// fs.writeFile(
//   "./data/collections.json",
//   JSON.stringify(data, null, 2),
//   (err) => {
//     if (err) {
//       if(!err){

//       }
//     }
//   }
// );
