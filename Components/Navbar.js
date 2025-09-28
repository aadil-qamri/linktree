"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// FloatingNavbar.jsx
// Default export React component using Tailwind CSS
// Behaviour:
// - Hides when user scrolls/swipes up (i.e., moves page down)
// - Shows when user scrolls/swipes down (i.e., moves page up)
// - Works for both desktop (wheel/scroll) and touch devices (swipe gestures)
// - Smooth transition and pointer-friendly styling

export default function FloatingNavbar() {
    const pathname = usePathname()
    const showNavbar = ["/", "/add"].includes(pathname)

    const [visible, setVisible] = useState(true);
    const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const touchStartY = useRef(null);
    const ticking = useRef(false);

    useEffect(() => {
        // Scroll handler (desktop and mobile scroll events)
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastY.current;

            // If delta > 0 -> user scrolled down (page moves down) -> hide navbar
            // If delta < 0 -> user scrolled up (page moves up) -> show navbar
            if (Math.abs(delta) > 5) {
                setVisible(delta < 0);
                lastY.current = currentY;
            }
        };

        // Use a rAF driven listener for smoothness
        const onScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        // Touch handlers for direct swipe detection (useful on mobile)
        const onTouchStart = (e) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onTouchMove = (e) => {
            // optional: we can detect while moving, but we'll use touchend for final decision
            // prevent interfering with normal scrolling
        };

        const onTouchEnd = (e) => {
            if (touchStartY.current == null) return;
            // If there are changedTouches, use the last touch
            const touchEndY = e.changedTouches && e.changedTouches[0]
                ? e.changedTouches[0].clientY
                : null;
            if (touchEndY == null) return;

            const dy = touchStartY.current - touchEndY;
            const threshold = 20; // minimum px to consider a swipe
            if (Math.abs(dy) < threshold) return; // ignore tiny moves

            if (dy > 0) {
                // swipe up -> hide
                setVisible(false);
            } else {
                // swipe down -> show
                setVisible(true);
            }

            touchStartY.current = null;
        };

        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    return (
        <>{showNavbar && <nav aria-label="Primary"
className={`fixed left-1/2 transform -translate-x-1/2 w-[95vw] md:w-[85vw] h-20 max-w-8xl z-50 transition-transform duration-900 delay-200 ease-in-out bg-white rounded-full py-2.5 px-10 md:top-10 top-3 flex
${visible ? "translate-y-0" : "-translate-y-[180%]"}
`}>
        <div className="logo flex items-center md:gap-12"><Link href="/"><Image width={120} height={35}  src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="logo"/></Link>
        <ul className='md:flex gap-6 text-gray-800 font-medium items-center hidden'>
          <Link target="_blank" href={"/product"}><li>Products</li></Link>
          <Link target="_blank" href={"/template"}><li>Templates</li></Link>
          <Link target="_blank" href={"/market"}><li>Marketplace</li></Link>
          <Link target="_blank" href={"/learn"}><li>Learn</li></Link>
          <Link target="_blank" href={"/pricing"}><li>Pricing</li></Link>
        </ul>
        <div className='flex relative gap-x-4 left-10 md:left-[30%]'>
          <button  onClick={()=> window.open("https://auth.linktr.ee/login", "_blank")} className="cursor-pointer flex bg-purple-100 px-2 py-4 md:px-8 md:py-4  rounded-lg font-medium text-sm md:text-xl justify-center items-center text-center">Log in</button>
          <button  onClick={()=> window.open("https://auth.linktr.ee/login", "_blank")} className="cursor-pointer flex bg-black px-2 py-4 md:px-8 md:py-4 text-white rounded-full font-medium text-sm md:text-xl justify-center items-center text-center ">Sign up free</button>
        </div>
        </div>
    </nav>}
    </>
    );
}
