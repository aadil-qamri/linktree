"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Template = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("https://linktr.ee/s/templates");
  }, [router]);

  return null; // or a loader if you want
}

export default Template;
