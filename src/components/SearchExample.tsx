import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

const SearchExample = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Debounce search term with 500ms delay
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Mock search function (replace with your actual API call)
  const performSearch = async (query: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock results
    return [
      {
        id: 1,
        title: `Result for "${query}"`,
        description: "This is a search result description",
      },
      {
        id: 2,
        title: `Another result for "${query}"`,
        description: "Another description here",
      },
      {
        id: 3,
        title: `More results for "${query}"`,
        description: "Yet another description",
      },
    ];
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  // Effect runs only when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      setIsLoading(true);
      performSearch(debouncedSearchTerm)
        .then((searchResults) => {
          setResults(searchResults);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search failed:", error);
          setIsLoading(false);
        });
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Example</h2>

      {/* Search Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          aria-label="Search input"
          tabIndex={0}
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Search Info */}
      <div className="text-sm text-gray-600 mb-4">
        <p>
          Search term: <span className="font-semibold">"{searchTerm}"</span>
        </p>
        <p>
          Debounced term:{" "}
          <span className="font-semibold">"{debouncedSearchTerm}"</span>
        </p>
        <p className="text-xs mt-1">
          API calls only happen when you stop typing for 500ms
        </p>
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {results.length > 0 && (
          <h3 className="text-lg font-semibold text-gray-700">Results:</h3>
        )}
        {results.map((result) => (
          <div
            key={result.id}
            className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-gray-800">{result.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{result.description}</p>
          </div>
        ))}

        {searchTerm && !debouncedSearchTerm && (
          <p className="text-gray-500 italic">
            Waiting for you to finish typing...
          </p>
        )}

        {debouncedSearchTerm && results.length === 0 && !isLoading && (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchExample;
