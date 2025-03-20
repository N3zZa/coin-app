
export type SearchInputProps = {
  searchQuery: string;
  setSearchQuery: (newValue:string) => void;
};

const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <div className="mt-2 mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name or symbol..."
        className="w-full p-2 border border-[#41403E] outline-none rounded"
      />
    </div>
  );
};

export default SearchInput