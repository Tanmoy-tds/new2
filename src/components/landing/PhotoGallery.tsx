"use client";

const IMAGES = [
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F6276d5656a834f8f9383669e69a50b65?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F2c2d9e00a10e42e4bc8ac8e64cf82c88?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F01fb595dc6ca4388b63b7a80a9bb5694?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Ff215094c6a0247d6ac5359affe5b80d9?format=webp&width=800",
  "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Fcbc69543db384100b0ca269a79d99570?format=webp&width=800",
];

export default function PhotoGallery() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
      {IMAGES.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-md">
          <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-24 object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
