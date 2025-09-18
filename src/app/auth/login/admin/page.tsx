"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [authorityCode, setAuthorityCode] = useState("");
  const [authorityUser, setAuthorityUser] = useState("");
  const [authorityPassword, setAuthorityPassword] = useState("");
  const [authRemember, setAuthRemember] = useState(false);
  const [authRole, setAuthRole] = useState("Dispatcher");

  const [showInfo, setShowInfo] = useState(true);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    setInfoVisible(true);
    const timer = setTimeout(() => setInfoVisible(false), 3500);
    const hideTimer = setTimeout(() => setShowInfo(false), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const router = useRouter();

  const DEMO_AUTH = { code: 'DEMO-ADMIN', user: 'admin', pass: 'admin123' };

  const handleAuthoritySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      authorityCode === DEMO_AUTH.code &&
      authorityUser === DEMO_AUTH.user &&
      authorityPassword === DEMO_AUTH.pass
    ) {
      try {
        sessionStorage.setItem('demo_auth', JSON.stringify({ role: 'authority', user: authorityUser }));
      } catch (err) {
        // ignore storage errors in some environments
      }
      router.push('/dashboard/admin');
      return;
    }

    alert('Invalid credentials. For demo use: Code: DEMO-ADMIN, Username: admin, Password: admin123');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="inline-block align-middle">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 1 7 7v3.382a2 2 0 0 0 .553 1.382l1.447 1.447A2 2 0 0 1 22 17.414V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1.586a2 2 0 0 1 .553-1.382l1.447-1.447A2 2 0 0 0 5 12.382V9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5v3.382a4 4 0 0 1-1.106 2.764l-1.447 1.447A1 1 0 0 0 3 17.414V19a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.586a1 1 0 0 0-.447-.829l-1.447-1.447A4 4 0 0 1 17 12.382V9a5 5 0 0 0-5-5Z"
                />
              </svg>
            </span>
            Tourist Safety Monitoring
          </h1>
          <div className="text-xs">Ministry of Tourism & Home Affairs | पर्यटन और गृह मंत्रालय</div>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="cursor-pointer hover:underline">हिंदी</span>
          <span>|</span>
          <span className="cursor-pointer hover:underline">English</span>
        </div>
      </header>

      <div className="w-full flex justify-center items-center min-h-[80px]">
        {showInfo && (
          <div
            className={`bg-blue-50 border border-blue-200 rounded px-6 py-3 max-w-xl w-full text-sm text-gray-700 transition-all duration-500 ${
              infoVisible ? "opacity-100 scale-100 session-notice-shadow" : "opacity-0 scale-95"
            }`}
          >
            <span className="font-semibold">For security purposes, this session will timeout after 30 minutes of inactivity.</span>{" "}
            <span className="text-blue-900">सुरक्षा कारणों से, यह सत्र 30 मिनट की निष्क्रियता के बाद समाप्त हो जाएगा।</span>
          </div>
        )}
      </div>

      <main className="flex flex-1 flex-col items-center justify-start">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl min-h-[420px] flex flex-col justify-start mt-2">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Authorities Login</h2>
          <div className="text-center text-xs text-gray-600 mb-6">Authorized access for Police and Tourism Department personnel</div>

          <div className="p-4 border rounded bg-gradient-to-br from-gray-50 to-white">
            <div className="mb-3 text-sm text-gray-600">Demo credentials — Code: <span className="font-mono">DEMO-ADMIN</span>, Username: <span className="font-mono">admin</span>, Password: <span className="font-mono">admin123</span></div>
            <form className="flex flex-col gap-3" onSubmit={handleAuthoritySubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Authority Code *</label>
                <input
                  name="authorityCode"
                  value={authorityCode}
                  onChange={(e) => setAuthorityCode(e.target.value)}
                  required
                  className="w-full rounded border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="E.g. POL-REG-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                <input
                  name="authorityUser"
                  value={authorityUser}
                  onChange={(e) => setAuthorityUser(e.target.value)}
                  required
                  className="w-full rounded border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  name="authorityPassword"
                  type="password"
                  value={authorityPassword}
                  onChange={(e) => setAuthorityPassword(e.target.value)}
                  required
                  className="w-full rounded border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={authRole}
                  onChange={(e) => setAuthRole(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Dispatcher</option>
                  <option>Field Officer</option>
                  <option>Senior Officer</option>
                  <option>Tourism Official</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={authRemember}
                    onChange={(e) => setAuthRemember(e.target.checked)}
                    className="accent-blue-700"
                  />
                  Keep me signed in
                </label>
                <Link href="/auth/forgot-password" className="text-blue-700 text-sm hover:underline">
                  Reset credentials
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-blue-700 rounded hover:bg-blue-800 transition duration-150"
              >
                Sign In as Authority
              </button>

              <div className="text-center text-sm text-gray-600">
                Tourist? <Link href="/auth/login" className="text-blue-700 hover:underline">Go to Tourist Login</Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t mt-8 py-6 px-8">
        <div className="flex flex-col md:flex-row justify-between max-w-5xl mx-auto gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Government Resources | सरकारी संसाधन</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="/auth/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Site Map
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Security Notice | सुरक्षा सूचना</h3>
            <p className="text-sm text-gray-600">
              This is a Government of India computer system intended for authorized users only. By accessing this system, you consent to
              monitoring and recording of your activities. यह भारत सरकार का कंप्यूटर सिस्टम है जो केवल अधिकृत उपयोगकर्ताओं के लिए है।
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">
          &copy; {new Date().getFullYear()} Government of India | भारत सरकार | All rights reserved | सभी अधिकार सुरक्षित
        </div>
      </footer>
    </div>
  );
}
