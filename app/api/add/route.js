import clientPromise from "@/lib/mongodb"




export async function POST(request) {
    const body = await request.json()

    const client = await clientPromise;
    const db = client.db("linktree")
    const collection = db.collection("links")

    // Unique Handlle check
    const doc = await collection.findOne({handle: body.handle})

    if(doc){
        return Response.json({success: false, error: true, message:"Handle Already Claimed", result: null})
    }

    const result = await collection.insertOne(body)


    return Response.json({success: true, error: false, message:"Link Added Successfully", result})
}