import TouristHeader from '@/components/dashboard/TouristHeader';
import AlertButton from '@/components/ui/AlertButton';

export default function TouristLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <TouristHeader />
      <main className="content-area flex-1 overflow-x-hidden overflow-y-auto pt-4 px-4 sm:px-6">
        <div className="w-full">{children}</div>
      </main>
      <AlertButton label="Alert Authorities" />
    </div>
  );
}
