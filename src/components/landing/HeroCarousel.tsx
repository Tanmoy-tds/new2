"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F6276d5656a834f8f9383669e69a50b65?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F2c2d9e00a10e42e4bc8ac8e64cf82c88?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F01fb595dc6ca4388b63b7a80a9bb5694?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Ff215094c6a0247d6ac5359affe5b80d9?format=webp&width=1600",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Fcbc69543db384100b0ca269a79d99570?format=webp&width=1600",
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full rounded-lg overflow-hidden">
      <div className="h-[62vh] md:h-[68vh] lg:h-[72vh] w-full relative">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${i + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-6 bottom-12 text-white max-w-2xl lg:max-w-lg">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight">Welcome to a World of Diverse Festivities and Scenic Journeys</h2>
          <p className="mt-2 text-sm md:text-base text-white/90">Experience the cultural mosaic and natural beauty of North Eastern India. Plan your trip with official travel advisories and resources.</p>
          <div className="mt-4 flex gap-3">
            <a href="https://tourism.gov.in/" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Explore</a>
            <a href="https://www.incredibleindia.org/" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-white text-gray-800 rounded-md text-sm">Visit Incredible India</a>
          </div>
        </div>
      </div>

      <div className="absolute right-4 bottom-4 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-8 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
