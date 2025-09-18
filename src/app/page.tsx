"use client";

import Link from "next/link";

export default function MainLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col items-center justify-center px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2 drop-shadow">
          Welcome to the North Eastern India Tourism Portal
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          This portal is a collaborative initiative by the{" "}
          <span className="font-semibold text-blue-700">
            Ministry of Development of North Eastern Region
          </span>
          ,{" "}
          <span className="font-semibold text-green-700">Ministry of Tourism</span>
          ,{" "}
          <span className="font-semibold text-red-700">Ministry of Home Affairs</span>{" "}
          (in collaboration with State Police Departments and NIC), to promote
          tourism, safety, and digital empowerment in North Eastern India.
        </p>
      </header>
      <main className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mb-8">
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            About the Ministries
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <span className="font-semibold text-blue-700">
                Ministry of Development of North Eastern Region:
              </span>{" "}
              Driving growth, infrastructure, and connectivity in the North East.
            </li>
            <li>
              <span className="font-semibold text-green-700">Ministry of Tourism:</span>{" "}
              Showcasing the rich culture, heritage, and natural beauty of India’s
              North East.
            </li>
            <li>
              <span className="font-semibold text-red-700">Ministry of Home Affairs:</span>{" "}
              Ensuring safety and security for tourists in collaboration with State
              Police Departments and NIC.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            Explore Tourism in India
          </h2>
          <p className="text-gray-700 mb-4">
            Discover breathtaking landscapes, vibrant festivals, and unique
            traditions. Plan your journey with trusted resources and stay updated
            on travel advisories for a safe and memorable experience.
          </p>
          <a
            href="https://www.incredibleindia.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
          >
            Visit Incredible India
          </a>
        </section>
      </main>
      <footer className="text-gray-600 text-sm text-center">
        <p>
          &copy; {new Date().getFullYear()} Ministry of Development of North
          Eastern Region, Ministry of Tourism, Ministry of Home Affairs, State
          Police Departments & NIC.
        </p>
        <div className="mt-4">
          <Link
            href="/auth/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Proceed to Login
          </Link>
        </div>
      </footer>
    </div>
  );
}
