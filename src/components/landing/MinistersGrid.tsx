"use client";

const MINISTERS = [
  {
    img: "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F6276d5656a834f8f9383669e69a50b65?format=webp&width=800",
    role: "Hon'ble Prime Minister",
    office: "Head of Government",
  },
  {
    img: "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F2c2d9e00a10e42e4bc8ac8e64cf82c88?format=webp&width=800",
    role: "Minister of Tourism",
    office: "Ministry of Tourism",
  },
  {
    img: "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F01fb595dc6ca4388b63b7a80a9bb5694?format=webp&width=800",
    role: "Minister of State (Tourism)",
    office: "Ministry of Tourism",
  },
];

export default function MinistersGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {MINISTERS.map((m, i) => (
        <div key={i} className="rounded-lg bg-white p-3 shadow flex flex-col items-center text-center">
          <img src={m.img} alt={`Photo of ${m.role}`} className="h-28 w-28 object-cover rounded-md" />
          <div className="mt-3 font-semibold text-gray-800">{m.role}</div>
          <div className="text-sm text-gray-500">{m.office}</div>
        </div>
      ))}
    </div>
  );
}
