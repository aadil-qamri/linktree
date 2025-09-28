"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Pricing = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://linktr.ee/s/pricing");
  }, [router]);

  return null; // or a loader if you want
}

export default Pricing;
