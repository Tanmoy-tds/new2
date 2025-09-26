import Link from "next/link";

export default function RegistrationOptionPage() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white py-4 px-8 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold flex items-center gap-2">
            <img src="https://cdn.builder.io/api/v1/image/assets%2Fd80b622de37e435587a7dad3146fc7f7%2Ff4b3a6c675644e11923e3dc795e8794c?format=webp&width=800" alt="Smart Tourist Safety System Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            Smart Tourist Safety System
          </h1>
          <div className="text-xs">AI-Powered Safety Monitoring & Response</div>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="cursor-pointer hover:underline">हिंदी</span>
          <span>|</span>
          <span className="cursor-pointer hover:underline">English</span>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Tourist Registration</h2>
          <p className="text-sm text-gray-600 mb-6">Please choose your category to continue | कृपया आगे बढ़ने के लिए अपनी श्रेणी चुनें</p>

          <div className="flex flex-col gap-3">
            <Link href="/auth/registration/local" className="block w-full py-3 font-semibold text-white bg-blue-700 rounded hover:bg-blue-800 transition">
              Register as Local (Indian)
            </Link>
            <Link href="/auth/registration/foreigner" className="block w-full py-3 font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition">
              Register as Foreigner
            </Link>
          </div>

          <div className="text-sm text-gray-600 mt-6">
            Already have an account? <Link href="/auth/login" className="text-blue-700 hover:underline">Back to Login</Link>
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
        <div className="text-center text-xs text-gray-500 mt-6">&copy; {year} Government of India | भा��त सरकार | All rights reserved | सभी अधिकार सुरक्षित</div>
      </footer>
    </div>
  );
}
