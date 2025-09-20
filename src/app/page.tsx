"use client";

import Link from "next/link";
import HeroCarousel from "@/components/landing/HeroCarousel";
import NewsTicker from "@/components/landing/NewsTicker";
import MinistersGrid from "@/components/landing/MinistersGrid";
import PhotoGallery from "@/components/landing/PhotoGallery";

export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 text-gray-900">
      <header className="site-header w-full bg-gradient-to-r from-white/95 to-sky-50 backdrop-blur sticky top-0 z-40 shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-3 md:px-6 py-4 w-full">
          <div className="flex items-center gap-4">
            <img src="/indian-emblem.svg" alt="Indian National Emblem" className="h-10 w-10 object-contain" />
            <div>
              <div className="font-extrabold text-xl md:text-2xl tracking-tight text-blue-900">North Eastern India Tourism Portal</div>
              <div className="text-sm text-gray-600">Ministry of Tourism • Ministry of Development of North Eastern Region</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition">Home</Link>
            <Link href="/auth/main" className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition">Destinations</Link>
            <Link href="/auth/main#events" className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition">Events</Link>
            <Link href="/auth/contact" className="text-lg font-semibold text-gray-800 hover:text-blue-700 transition">Contact</Link>
            <Link href="/auth/login" className="ml-2 inline-flex items-center gap-2 text-lg font-semibold rounded-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg hover:scale-105 transform transition">Login</Link>
          </nav>

          <div className="md:hidden">
            <Link href="/auth/login" className="text-sm font-semibold rounded-full px-3 py-2 bg-blue-700 text-white shadow">Login</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-4">
          <NewsTicker />
        </div>

        <section className="mb-8">
          <HeroCarousel />
        </section>

        <section className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between gap-6 flex-col lg:flex-row">
            <div className="lg:flex-1">
              <h2 className="text-2xl font-bold text-blue-700 mb-3">About the Ministries</h2>
              <p className="text-gray-700 mb-4">This portal is a collaborative initiative by the <strong className="text-blue-700">Ministry of Development of North Eastern Region</strong>, <strong className="text-green-700">Ministry of Tourism</strong>, and <strong className="text-red-700">Ministry of Home Affairs</strong> (in collaboration with State Police Departments and NIC), to promote tourism, safety, and digital empowerment in North Eastern India.</p>

              <div className="mt-4">
                <MinistersGrid />
              </div>
            </div>

            <aside className="lg:w-80 mt-6 lg:mt-0">
              <div className="rounded-lg border p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-800">What's New</h3>
                <ul className="mt-3 text-sm text-gray-700 space-y-2">
                  <li>New MICE digital catalogue released.</li>
                  <li>Travel advisory updated for selected regions.</li>
                  <li>National Tourism Awards — submissions open.</li>
                </ul>
                <div className="mt-4">
                  <Link href="/auth/login" className="inline-block px-3 py-2 bg-blue-700 text-white rounded-md text-sm">View Dashboard</Link>
                </div>
              </div>

              <div className="mt-4 rounded-lg border p-4">
                <h4 className="font-semibold">Related Links</h4>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  <li><a href="https://www.incredibleindia.org/" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">Incredible India</a></li>
                  <li><a href="#" className="text-blue-700 hover:underline">Indian Rail Catering & Tourism</a></li>
                  <li><a href="#" className="text-blue-700 hover:underline">Tourist Visa</a></li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Photo Gallery</h3>
          <PhotoGallery />
        </section>

        <section id="events" className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Featured Programs & News</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <h4 className="font-semibold">Destination Development</h4>
              <p className="text-sm text-gray-600 mt-2">Projects and initiatives to improve visitor experience across the North East.</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h4 className="font-semibold">Marketing & Promotion</h4>
              <p className="text-sm text-gray-600 mt-2">Campaigns and partnerships to showcase the region to global travellers.</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h4 className="font-semibold">Research & Analytics</h4>
              <p className="text-sm text-gray-600 mt-2">Insights to guide policy and improve tourism outcomes for local communities.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="mt-12 border-t bg-white/90 py-6">
        <div className="container mx-auto px-6 text-sm text-gray-600">&copy; {new Date().getFullYear()} Government of India — North Eastern India Tourism Portal</div>
      </footer>

    </div>
  );
}
