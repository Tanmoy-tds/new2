export default function SearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget as HTMLFormElement).get('q') as string;
        onSearch?.(q || '');
      }}
      className="relative"
    >
      <input
        name="q"
        type="search"
        placeholder="Search..."
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
