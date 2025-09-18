"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OtpPage() {
  const search = useSearchParams();
  const router = useRouter();
  const purpose = search.get("purpose") || "general";
  const mobileParam = search.get("mobile") || "";
  const nextUrl = search.get("next") || "";

  const [mobile, setMobile] = useState(mobileParam);
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const autoSentRef = useRef(false);

  useEffect(() => {
    if (mobileParam) setMobile(mobileParam);
  }, [mobileParam]);

  // auto-send OTP once on mount if mobile provided
  useEffect(() => {
    if (mobile && /^\d{10}$/.test(mobile) && !autoSentRef.current) {
      autoSentRef.current = true;
      setTimeout(() => sendOtp(), 250);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = window.setInterval(() => setTimer((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [timer]);

  useEffect(() => {
    const code = digits.join("");
    if (/^\d{6}$/.test(code)) {
      const id = setTimeout(() => handleVerify(), 250);
      return () => clearTimeout(id);
    }
  }, [digits]);

  function maskMobile(m?: string) {
    if (!m) return "";
    if (m.length !== 10) return m;
    return `${m.slice(0, 3)}******${m.slice(9)}`;
  }

  function validateMobile(m: string) {
    return /^\d{10}$/.test(m);
  }

  async function sendOtp(forcedMobile?: string) {
    const m = forcedMobile ?? mobile;
    setErrors([]);
    if (!validateMobile(m)) {
      setErrors(["Enter a valid 10 digit mobile number"]);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: m, purpose }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setIsEditingMobile(false);
        setDigits(["", "", "", "", "", ""]);
        setTimer(30);
        inputsRef.current[0]?.focus();
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

  function handleDigitChange(val: string, idx: number) {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val;
    setDigits(next);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    const key = e.key;
    if (key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        const prev = [...digits];
        prev[idx - 1] = "";
        setDigits(prev);
      }
      e.preventDefault();
    } else if (key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
      e.preventDefault();
    } else if (key === "ArrowRight" && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
      e.preventDefault();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const paste = e.clipboardData.getData("text").trim();
    const digitsOnly = paste.replace(/\D/g, "");
    if (!/^\d{6}$/.test(digitsOnly)) return;
    setDigits(digitsOnly.split(""));
    inputsRef.current[5]?.focus();
    e.preventDefault();
  }

  function otpValue() {
    return digits.join("");
  }

  async function handleVerify() {
    const code = otpValue();
    setErrors([]);
    if (!/^\d{6}$/.test(code)) return;
    setVerifying(true);
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, code, purpose }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setVerified(true);
        setTimeout(() => {
          const returnUrl = nextUrl || "/auth/login";
          // append verified flag and mobile to return URL
          const sep = returnUrl.includes("?") ? "&" : "?";
          router.push(`${returnUrl}${sep}mobile=${mobile}&verified=1`);
        }, 700);
      } else {
        setErrors([data?.message || "Invalid OTP"]);
        setDigits(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setErrors(["Verification failed"]);
    } finally {
      setVerifying(false);
    }
  }

  function formatTimer(s: number) {
    const mm = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }

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

      <main className="flex flex-1 flex-col items-center justify-start py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-2xl min-h-[520px] flex flex-col justify-start mt-8">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Enter OTP</h2>

          <p className="text-center text-sm text-gray-600 mb-4">
            6 digit code sent to <span className="font-medium text-gray-800">{maskMobile(mobile)}</span>
            <button
              aria-label="Edit mobile"
              title="Edit mobile"
              onClick={() => setIsEditingMobile(true)}
              className="ml-2 text-blue-700 hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
                <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor" />
              </svg>
            </button>
          </p>

          {isEditingMobile && (
            <div className="mt-4 flex gap-2 justify-center">
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                placeholder="Enter 10 digit mobile"
                className="px-3 py-2 border rounded w-64 focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700"
              />
              <button onClick={() => sendOtp()} disabled={sending} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">
                {sending ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3">
              <ul className="text-sm list-disc pl-5">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mt-6" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={d}
                onChange={(e) => handleDigitChange(e.target.value.replace(/[^0-9]/g, ""), i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                maxLength={1}
                inputMode="numeric"
                className="w-14 h-14 rounded-md border border-gray-300 text-center text-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                aria-label={`OTP digit ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            {timer > 0 ? (
              <div className="text-lg text-gray-800 font-medium">Time left: <span className="font-mono">{formatTimer(timer)}</span></div>
            ) : (
              <div>
                <button onClick={() => sendOtp()} className="text-sm text-blue-700 hover:underline" disabled={sending}>
                  Resend OTP
                </button>
              </div>
            )}
          </div>

          <div className="mt-10">
            <button
              onClick={handleVerify}
              disabled={!/^\d{6}$/.test(otpValue()) || verifying}
              className={`w-full py-3 font-semibold text-white rounded ${/^\d{6}$/.test(otpValue()) && !verifying ? "bg-blue-700 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`}
            >
              {verifying ? "Verifying..." : "Verify & Proceed"}
            </button>
          </div>

          {verified && (<div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-center">Verified successfully. Redirecting...</div>)}

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
