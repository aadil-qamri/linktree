"use client"
import Image from "next/image";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],   // required
  weight: ["900"], // choose weights you need
  style: ["normal"],   // optional
  variable: "--font-poppins",    // optional (for CSS variable usage)
});

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")
  const createTree = () => {
    router.push(`/add?handle=${text}`)
  }

  return (
    <main className={`bg-chartreuse-100 pt-14 ${poppins.className}`}>
      <section className="min-h-[100vh] grid  md:grid-cols-2">
        <div className="flex justify-center md:items-start items-center flex-col md:ml-[5vw] mt-14 md:mt-0 gap-y-4 md:gap-y-9">
          <p className="text-forest-100 font-black text-4xl md:text-7xl">
            <span className="text-center">A link in bio</span>
            <span className="block text-center">built for you.</span>
          </p>
          <p className="text-forest-100 text-md md:text-xl md:text-start text-center font-light md:font-medium">Join 70M+ people using Linktree for their link
            in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input md:flex contents gap-10">
            <input value={text} onChange={(e) => setText(e.target.value)} className="bg-white px-4 w-[90vw] md:w-[18rem]  font-normal rounded-lg py-4 focus:outline-chartreuse-100" type="text" placeholder="Your Handle" />
            <button onClick={() => createTree()} className="cursor-pointer bg-forest-100 rounded-full w-[90vw] md:w-[12rem] font-semibold text-white px-4 py-4 md:grow-[0.5]">Get started for free</button>
          </div>
        </div>
        <div className="flex justify-center md:items-center flex-col mt-14 md:mt-0">
          <Image
            className="relative overflow-hidden z-0" src="/section2.png" alt="My Logo1" width={600} height={500} priority />
        </div>
      </section>
      <section className="bg-ocean-100 min-h-[100vh] grid md:grid-cols-2">
        <div className="flex justify-center md:items-start flex-col gap-6 order-1 md:order-2">
          <p className="text-chartreuse-100 font-black text-3xl md:text-6xl pt-10 text-center md:text-start">
            {/* Mobile */}
            <span className="block md:hidden">Create and</span>
            <span className="block md:hidden">customize your</span>
            <span className="block md:hidden">linktree in minutes</span>

            {/* Desktop */}
            <span className="hidden md:block">Create and customize</span>
            <span className="hidden md:block">your linktree in</span>
            <span className="hidden md:block">minutes</span>
          </p>
          <p className="text-white text-sm md:text-xl md:font-normal font-medium text-center md:text-start">
            Connect all your content across social media, websites, stores and more in one link in bio.
            Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.
          </p>
          <div className="input flex justify-center gap-10">
            <button
              onClick={() => createTree()}
              className="cursor-pointer bg-chartreuse-100 rounded-full w-[90vw] md:w-[12rem] font-semibold px-4 py-4 md:grow-[0.2]"
            >
              Get started for free
            </button>
          </div>
        </div>

        {/* Image Block */}
        <div className="flex justify-center mr-[5vw] items-center flex-col mt-14 md:mt-0 order-2 md:order-1">
          <Image
            className="relative overflow-hidden z-0"
            src="/section1.png"
            alt="My Logo2"
            width={500}
            height={600}
            priority
          />
        </div>
      </section>

    </main>
  );
}
