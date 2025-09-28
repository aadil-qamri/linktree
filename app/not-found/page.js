// app/not-found/page.js
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d2e823] text-[#2666d6] px-6">
      <h1 className="text-7xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl mb-6 font-semibold">Oops! Page not found</h2>
      <p className="mb-8 text-center max-w-lg text-[#2666d6]/90">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#2666d6] text-[#d2e823] font-bold px-6 py-3 rounded-lg hover:brightness-90 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
