import { Suspense } from "react";
import Addpage from "./Addpage";

export default function AddWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Addpage />
    </Suspense>
  );
}
