import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-32 rounded-full bg-yellow-50 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:w-52 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50 sm:w-60  sm:focus:w-80"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Order #"
      />
    </form>
  );
}

export default SearchOrder;