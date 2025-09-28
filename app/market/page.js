"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Market = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://linktr.ee/marketplace");
  }, [router]);

  return null; 
}

export default Market;
