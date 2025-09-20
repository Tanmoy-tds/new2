import SafetyStatus from "@/components/dashboard/SafetyStatus";
import ItineraryView from "@/components/dashboard/ItineraryView";
import EmergencyContacts from "@/components/dashboard/EmergencyContacts";
import PanicButton from "@/components/dashboard/PanicButton";
import GeoFenceAlerts from "@/components/dashboard/GeoFenceAlerts";

export default function TouristHomePage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <section className="rounded-xl border bg-white p-4 shadow-sm">
          <h2 className="text-base font-semibold">Welcome</h2>
          <p className="mt-1 text-sm text-gray-600">Here is a quick overview of your safety and plans today.</p>
        </section>
        <SafetyStatus />
        <ItineraryView expanded={false} />
        <GeoFenceAlerts />
      </div>
      <div className="space-y-6">
        <PanicButton />
        <EmergencyContacts expanded={false} />
      </div>
    </div>
  );
}
