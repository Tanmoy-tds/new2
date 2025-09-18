export default function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="data-table overflow-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full table-auto text-sm">{children}</table>
    </div>
  );
}
