import { useState } from "react";
import useDebounce from "./hooks/useDebounce";
import Posts from "./components/Posts";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const debounce = useDebounce(searchQuery);
  // Simulate expensive computation
  const filteredItems = Array.from(
    { length: 10000 },
    (_, index) => `Item ${index}`
  ).filter((item) => item.toLowerCase().includes(debounce.toLowerCase()));

  return (
    <div className="mx-auto max-w-4xl p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Posts Feed</h1>
        <p className="text-gray-600">Browse through the latest posts</p>
      </header>

      <main>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Posts />
        </div>
      </main>

      {/* Commented search functionality */}
      {/* <div className="mt-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <div
          className="mt-2 max-h-[200px] overflow-auto rounded-lg border border-gray-200"
        >
          {filteredItems.map((item, index) => (
            <div key={index} className="p-2 hover:bg-gray-100">{item}</div>
          ))}
        </div>
        <button 
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors"
          onClick={() => console.log("Clicked")}
        >
          Click Action
        </button>
      </div> */}
    </div>
  );
}

export default App;
