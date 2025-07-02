import { useState } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const debounce = useDebounce(searchQuery);
  // Simulate expensive computation
  const filteredItems = Array.from(
    { length: 10000 },
    (_, index) => `Item ${index}`
  ).filter((item) => item.toLowerCase().includes(debounce.toLowerCase()));

  return (
    <>
      <div className="card">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items..."
        />

        <div
          className="filter"
          style={{ maxHeight: "200px", overflow: "auto" }}
        >
          {filteredItems.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
        <button className="btn-action" onClick={() => console.log("Clicked")}>
          Click Action
        </button>
      </div>
    </>
  );
}

export default App;
