// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingNavbar from "@/Components/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],   // required
  weight: ["400", "500", "700"], // choose weights you need
  style: ["normal", "italic"],   // optional
  variable: "--font-poppins",    // optional (for CSS variable usage)
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Link in bio tool: Everything you are, in one simple link | Linktree",
  description: "Notlinktree - For Organizing all your links in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      >
        <FloatingNavbar />
        {children}
      </body>
    </html>
  );
}
