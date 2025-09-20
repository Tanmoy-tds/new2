import EmergencyContacts from "@/components/dashboard/EmergencyContacts";
import PanicButton from "@/components/dashboard/PanicButton";

export default function TouristEmergencyPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <EmergencyContacts expanded />
      </div>
      <div>
        <PanicButton />
      </div>
    </div>
  );
}
