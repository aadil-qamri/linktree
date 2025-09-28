"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { Flip } from 'react-toastify';
import { useSearchParams } from 'next/navigation';


const Addpage = () => {

  const searchParams = useSearchParams()
  const [links, setLinks] = useState([{ link: "", linktext: "" }])
  const [handle, setHandle] = useState(searchParams.get("handle") || "");
  const [picture, setPicture] = useState("")
  const [desc, setDesc] = useState("")

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linktext }
        }
        else {
          return item
        }
      })
    })
  }


  const addlink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]))
  }



  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "picture": picture,
      "desc": desc
    });



    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const REQ = await fetch("/api/add", requestOptions)
    const RESULT = await REQ.json()

    if (RESULT.success) {
      toast.success(`${RESULT.message}`, {
        position: "top-right",
        autoClose: 1696,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      setLinks([]);
      setPicture("");
      setHandle("");
      setDesc("");
    }
    else{
       toast.error(`${RESULT.message}`, {
      position: "top-right",
      autoClose: 1696,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
    }

  }

  return (
  <div className="min-h-screen bg-sea-100 grid md:grid-cols-2 grid-cols-1">

    {/* Left Column */}
    <div className="flex justify-center items-start md:items-center flex-col px-6 md:px-16 py-10 pt-26">
      <div className="flex flex-col gap-5 w-full max-w-xl">
        <h1 className="text-white text-4xl md:text-5xl font-bold">Create Your Linktree</h1>

        {/* Step 1 */}
        <div className="item">
          <h2 className="text-white text-2xl md:text-3xl font-semibold">Step 1: Claim your handle</h2>
          <div className="mt-2">
            <input
              value={handle || ""}
              onChange={(e) => setHandle(e.target.value)}
              className="bg-white px-4 py-2 my-2 rounded-xl focus:outline-sea-100 w-full"
              type="text"
              placeholder="Choose a handle"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="item">
          <h2 className="text-white text-2xl md:text-3xl font-semibold">Step 2: Add your Links</h2>
          {links &&
            links.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-2 my-2 w-full">
                <input
                  value={item.linktext}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="bg-white px-4 py-2 rounded-xl focus:outline-sea-100 flex-1"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="bg-white px-4 py-2 rounded-xl focus:outline-sea-100 flex-1"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
          <button
            onClick={() => addlink()}
            className="cursor-pointer p-3 bg-stone-950 text-white rounded-3xl font-semibold mt-2"
          >
            Add Link
          </button>
        </div>

        {/* Step 3 */}
        <div className="item">
          <h2 className="text-white text-2xl md:text-3xl font-semibold">Step 3: Add picture and description</h2>
          <div className="flex flex-col gap-2 mt-2 w-full">
            <input
              value={picture || ""}
              onChange={(e) => setPicture(e.target.value)}
              className="bg-white px-4 py-2 rounded-xl focus:outline-sea-100 w-full"
              type="text"
              placeholder="Enter link to profile pic"
            />
            <input
              value={desc || ""}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-white px-4 py-2 rounded-xl focus:outline-sea-100 w-full"
              type="text"
              placeholder="Enter short description"
            />
            <button
              disabled={
                picture === "" || handle === "" || links[0].linktext === ""
              }
              onClick={() => submitLinks()}
              className="disabled:bg-stone-500 cursor-pointer p-3 bg-stone-950 text-white rounded-3xl font-semibold mt-2 w-fit"
            >
              Create Your Linktree
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div className="relative w-full h-64 md:h-auto md:min-h-screen hidden md:flex justify-center items-center">
      <Image
        src="/login.png"
        alt="login image"
        fill
        className="object-contain"
      />
    </div>

    {/* Toast */}
    <ToastContainer
      position="top-center"
      autoClose={1696}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}
    />
  </div>
)
}

export default Addpage
