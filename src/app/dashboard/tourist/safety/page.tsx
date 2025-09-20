import SafetyStatus from "@/components/dashboard/SafetyStatus";
import GeoFenceAlerts from "@/components/dashboard/GeoFenceAlerts";
import LocationSharing from "@/components/ui/LocationSharing";

export default function TouristSafetyPage() {
  return (
    <div className="space-y-6">
      <SafetyStatus />
      <GeoFenceAlerts />
      <LocationSharing />
    </div>
  );
}
