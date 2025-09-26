"use client";

const MINISTERS = [
  {
    img: "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Fe357d0e68da94dfe9444d9eabf807195?format=webp&width=800",
    role: "Hon'ble Prime Minister",
    office: "Head of Government",
  },
  {
    img: "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2F90e8a3f8c8684d71be829f5989ece90b?format=webp&width=800",
    role: "Minister of Tourism",
    office: "Ministry of Tourism",
  },
  {
    img: "https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Fe562186376fd4b8b9d79b556ecc7951d?format=webp&width=800",
    role: "Minister of Railways",
    office: "Ministry of Railways",
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
