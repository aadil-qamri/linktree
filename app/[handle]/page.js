import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page({ params }) {
  const { handle } = await params
  const client = await clientPromise;
  const db = client.db("linktree")
  const collection = db.collection("links")

  // Unique Handlle check
  const item = await collection.findOne({ handle: handle })
  if (!item) {
    return notFound()
  }

  return (
    <div className="bg-sea-100 flex flex-col items-center min-h-screen py-10 px-4 md:px-10">

      {item && <div className="photo flex flex-col justify-center items-center gap-4 w-full max-w-md">
        <Image width={200} height={200} className="rounded-full" src={item.picture} alt="image of item" />
        <span className="font-bold text-xl md:text-2xl text-white">@{item.handle}</span>
        <span className="desc text-gray-300 text-center">{item.desc}</span>
        <div className="links flex flex-col w-full gap-4 mt-4">
          {item.links.map((item, index) => {
            const url = item.link.startsWith("https://")
              ? item.link
              : `https://${item.link}`;
            return <Link href={url} key={index} rel="noopener noreferrer" target="_blank"><div className="py-3 px-4 shadow-lg bg-white rounded-md flex justify-center text-center hover:bg-gray-100 transition w-full">
              {item.linktext}</div></Link>

          })}
        </div>
      </div>}
    </div>
  )
}