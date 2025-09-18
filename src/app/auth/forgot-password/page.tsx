"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const search = useSearchParams();
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false); // not used for central flow but kept for UI
  const [newPassword, setNewPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [mobileVerified, setMobileVerified] = useState(false);

  useEffect(() => {
    // If user returned from OTP page with verification, show reset form
    const verified = search.get("verified");
    const m = search.get("mobile");
    if (verified === "1" && m) {
      setMobile(m);
      setMobileVerified(true);
    }
  }, [search]);

  function validateMobile(m: string) {
    return /^\d{10}$/.test(m);
  }

  async function handleSendOtp(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setErrors([]);
    if (!validateMobile(mobile)) {
      setErrors(["Enter a valid 10 digit mobile number"]);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, purpose: "forgot_password" }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Redirect to central OTP page to enter code
        router.push(`/auth/otp?mobile=${mobile}&purpose=forgot_password&next=${encodeURIComponent("/auth/forgot-password")}`);
      } else {
        setErrors([data?.message || "Failed to send OTP"]);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setErrors(["Failed to send OTP"]);
    } finally {
      setSending(false);
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    if (!mobileVerified) {
      setErrors(["Mobile must be verified before resetting password"]);
      return;
    }
    if (newPassword.length < 6) {
      setErrors(["Password must be at least 6 characters"]);
      return;
    }
    setResetting(true);
    try {
      // In production: call password reset endpoint
      await new Promise((r) => setTimeout(r, 600));
      router.push("/auth/login");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setErrors(["Failed to reset password"]);
    } finally {
      setResetting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
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

      <main className="flex flex-1 flex-col items-center justify-start">
        <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md min-h-[420px] flex flex-col justify-start mt-8">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Forgot Password</h2>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded mb-4">
              <ul className="text-sm list-disc pl-5">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {!mobileVerified ? (
            // Step 1: request OTP (redirects to /auth/otp)
            <form className="flex flex-col gap-4" onSubmit={handleSendOtp}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter your registered mobile number</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="\\d*"
                  maxLength={10}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" disabled={sending} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                  {sending ? "Sending OTP..." : "Send OTP"}
                </button>
                <Link href="/auth/login" className="text-sm text-blue-700 hover:underline ml-auto">Back to Login</Link>
              </div>
            </form>
          ) : (
            // Step 2: reset password after verification
            <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <button type="submit" disabled={resetting} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                  {resetting ? "Resetting..." : "Reset Password"}
                </button>
                <Link href="/auth/login" className="px-4 py-2 border rounded text-sm text-blue-700 hover:bg-blue-50">Cancel</Link>
              </div>
            </form>
          )}

          <div className="text-center text-sm text-gray-600 mt-6">
            Remembered your password? <Link href="/auth/login" className="text-blue-700 hover:underline">Login here</Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t mt-auto py-6 px-8">
        <div className="flex flex-col md:flex-row justify-between max-w-5xl mx-auto gap-8">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Government Resources | सरकारी संसाधन</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms of Use</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">Accessibility</a></li>
              <li><a href="/auth/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:underline">Site Map</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Security Notice | सुरक्षा सूचना</h3>
            <p className="text-sm text-gray-600">This is a Government of India computer system intended for authorized users only. By accessing this system, you consent to monitoring and recording of your activities. यह भारत सरकार का कंप्यूटर सिस्टम है जो केवल अधिकृत उपयोगकर्ताओं के लिए है।</p>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">&copy; {new Date().getFullYear()} Government of India | भारत सरकार | All rights reserved | सभी अधिकार सुरक्षित</div>
      </footer>
    </div>
  );
}
