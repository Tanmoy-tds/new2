"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const search = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [visaType, setVisaType] = useState("");
  const [visaNumber, setVisaNumber] = useState("");
  const [visaExpiry, setVisaExpiry] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileVerified, setMobileVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [stayAddress, setStayAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");
  const [medicalInfo, setMedicalInfo] = useState("");
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // read verification return from OTP page
    const verified = search.get("verified");
    const m = search.get("mobile");
    if (verified === "1" && m && m === mobile) {
      setMobileVerified(true);
    }
  }, [search, mobile]);

  function validate(): boolean {
    const errs: string[] = [];
    if (!fullName.trim()) errs.push("Full name is required");
    if (!nationality.trim()) errs.push("Nationality is required");
    if (!passportNumber.trim()) errs.push("Passport number is required");
    if (!passportExpiry) errs.push("Passport expiry date is required");
    if (!visaType.trim()) errs.push("Visa type is required");
    if (!visaNumber.trim()) errs.push("Visa number is required");
    if (!visaExpiry) errs.push("Visa expiry date is required");
    if (!mobile.match(/^\d{10}$/)) errs.push("Mobile must be a 10 digit number");
    if (!mobileVerified) errs.push("Mobile number must be verified");
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.push("Email is invalid");
    if (!emergencyName.trim()) errs.push("Emergency contact name is required");
    if (!emergencyPhone.match(/^\d{10}$/)) errs.push("Emergency contact phone must be 10 digits");
    if (!consent) errs.push("You must consent to data processing to continue");
    setErrors(errs);
    return errs.length === 0;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setter(file);
  }

  async function handleSendOtp() {
    setErrors([]);
    if (!mobile.match(/^\d{10}$/)) {
      setErrors(["Enter a valid 10 digit mobile number before requesting OTP"]);
      return;
    }
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, purpose: 'register_foreigner' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push(`/auth/otp?mobile=${mobile}&purpose=register_foreigner&next=${encodeURIComponent('/auth/registration/foreigner')}`);
      } else {
        setErrors([data?.message || 'Failed to send OTP']);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setErrors(['Failed to send OTP']);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      // In production, upload files and submit to server
      await new Promise((r) => setTimeout(r, 800));
      router.push("/auth/login");
    } catch (err) {
      setErrors(["Failed to submit. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <span className="inline-block align-middle">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2a7 7 0 0 1 7 7v3.382a2 2 0 0 0 .553 1.382l1.447 1.447A2 2 0 0 1 22 17.414V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-1.586a2 2 0 0 1 .553-1.382l1.447-1.447A2 2 0 0 0 5 12.382V9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5v3.382a4 4 0 0 1-1.106 2.764l-1.447 1.447A1 1 0 0 0 3 17.414V19 a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.586 a1 1 0 0 0-.447-.829 l-1.447-1.447 A4 4 0 0 1 17 12.382 V9 a5 5 0 0 0-5-5Z"/>
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
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mt-8 mb-8 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-blue-900">Foreigner Registration</h2>
            <Link href="/auth/registration/option" className="text-sm text-blue-700 hover:underline">Back to options</Link>
          </div>

          <p className="text-sm text-gray-600">Provide accurate details for safety, verification and immigration compliance.</p>

          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
              <ul className="text-sm list-disc pl-5">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="As in passport" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality *</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport number *</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport expiry *</label>
              <input type="date" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visa type *</label>
              <select className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={visaType} onChange={(e) => setVisaType(e.target.value)} required>
                <option value="">Select visa type</option>
                <option value="tourist">Tourist</option>
                <option value="business">Business</option>
                <option value="transit">Transit</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visa number *</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={visaNumber} onChange={(e) => setVisaNumber(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Visa expiry *</label>
              <input type="date" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={visaExpiry} onChange={(e) => setVisaExpiry(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number *</label>
              <div className="flex gap-2">
                <input inputMode="numeric" pattern="\\d*" maxLength={10} className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={mobile} onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder="10 digit mobile" required />
                <button type="button" onClick={handleSendOtp} className="px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">Send OTP</button>
              </div>
              {mobileVerified && <div className="text-xs text-green-700 mt-1">Mobile verified</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Optional" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Planned arrival date</label>
              <input type="date" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Planned departure date</label>
              <input type="date" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Intended stay address (hotel / host)</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={stayAddress} onChange={(e) => setStayAddress(e.target.value)} placeholder="Hotel / Host address" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flight / Arrival details</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} placeholder="Airline & flight number" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency contact name *</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency contact phone *</label>
              <input inputMode="numeric" pattern="\\d*" maxLength={10} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel insurance provider</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={insuranceProvider} onChange={(e) => setInsuranceProvider(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Insurance policy number</label>
              <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={insurancePolicy} onChange={(e) => setInsurancePolicy(e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical conditions / allergies</label>
              <textarea className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 placeholder:text-gray-700 placeholder:font-medium text-gray-700" value={medicalInfo} onChange={(e) => setMedicalInfo(e.target.value)} placeholder="Optional" rows={3} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passport scan (image/pdf)</label>
              <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, setPassportFile)} className="block w-full text-sm text-gray-700" />
              {passportFile && <div className="text-xs text-gray-600 mt-1">Selected: {passportFile.name}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selfie (for liveness check)</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setSelfieFile)} className="block w-full text-sm text-gray-700" />
              {selfieFile && <div className="text-xs text-gray-600 mt-1">Selected: {selfieFile.name}</div>}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input id="consent_foreigner" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            <label htmlFor="consent_foreigner" className="text-sm text-gray-700">I consent to the collection and processing of my data for safety, verification and immigration compliance. I understand the <a className="text-blue-700 hover:underline" href="#">privacy policy</a>.</label>
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition">{submitting ? "Submitting..." : "Register"}</button>
            <Link href="/auth/login" className="px-4 py-2 border rounded text-sm text-blue-700 hover:bg-blue-50">Cancel</Link>
          </div>
        </form>
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
