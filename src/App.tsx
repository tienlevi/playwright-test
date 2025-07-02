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
    </div>
  );
}

export default App;
