"use client";

import Link from "next/link";

export default function MainLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex flex-col items-center justify-start px-4 py-0">
      {/* Navigation Bar */}
      <nav className="w-full bg-white shadow flex items-center justify-between px-8 py-4 mb-8">
        <div className="flex items-center gap-3">
          <img
            src="https://tourism.gov.in/sites/default/files/logo_0.png"
            alt="India Tourism Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="font-bold text-xl text-blue-800">
            North Eastern India Tourism Portal
          </span>
        </div>
        <div className="flex gap-8">
          <Link
            href="/auth/main"
            className="text-blue-700 font-semibold hover:underline"
          >
            Home
          </Link>
          <Link
            href="/auth/contact"
            className="text-blue-700 font-semibold hover:underline"
          >
            Contact Us
          </Link>
          <Link
            href="/auth/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="w-full max-w-4xl mx-auto text-center py-8">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-lg">
          Explore North Eastern India
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Discover the beauty, culture, and heritage of North Eastern India. This
          portal is a collaborative initiative by the{" "}
          <span className="font-semibold text-blue-700">
            Ministry of Development of North Eastern Region
          </span>
          ,{" "}
          <span className="font-semibold text-green-700">Ministry of Tourism</span>
          ,{" "}
          <span className="font-semibold text-red-700">Ministry of Home Affairs</span>{" "}
          (in collaboration with State Police Departments and NIC), to promote
          tourism, safety, and digital empowerment.
        </p>
      </header>

      {/* Ministries Section */}
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mb-8">
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
            Our Ministries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Ministry of Development of North Eastern Region
              </h3>
              <p className="text-gray-700">
                Driving growth, infrastructure, and connectivity in the North East.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Ministry of Tourism
              </h3>
              <p className="text-gray-700">
                Showcasing the rich culture, heritage, and natural beauty of India’s
                North East.
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-6 shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Ministry of Home Affairs
              </h3>
              <p className="text-gray-700">
                Ensuring safety and security for tourists in collaboration with State
                Police Departments and NIC.
              </p>
            </div>
          </div>
        </section>

        {/* Tourism Section */}
        <section>
          <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">
            Explore Tourism in India
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            Discover breathtaking landscapes, vibrant festivals, and unique
            traditions. Plan your journey with trusted resources and stay updated
            on travel advisories for a safe and memorable experience.
          </p>
          <div className="flex justify-center">
            <a
              href="https://www.incredibleindia.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
            >
              Visit Incredible India
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-gray-600 text-sm text-center mt-8">
        <p>
          &copy; {new Date().getFullYear()} Ministry of Development of North
          Eastern Region, Ministry of Tourism, Ministry of Home Affairs, State
          Police Departments & NIC.
        </p>
      </footer>
    </div>
  );
}