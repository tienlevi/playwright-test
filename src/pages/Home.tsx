import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Footer from "../components/Footer";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const debounce = useDebounce(searchQuery);
  // Simulate expensive computation
  const filteredItems = Array.from(
    { length: 10000 },
    (_, index) => `Item ${index}`
  ).filter((item) => item.toLowerCase().includes(debounce.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="mx-auto max-w-4xl p-4 flex-grow">
        <main>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Posts />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
