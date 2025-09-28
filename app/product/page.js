"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Product = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://linktr.ee/");
  }, [router]);

  return null; // or a loader if you want
}

export default Product;
