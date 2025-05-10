import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const Herosection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    dispatch(setSearchQuery(trimmedQuery));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="relative bg-[#F5F7FA] py-24 overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A9CCE3]/20 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex flex-col gap-10 my-16 items-center">
          {/* Badge */}
          <span className="px-6 py-2 rounded-full bg-[#A9CCE3] text-[#2C3E50] font-semibold text-sm uppercase tracking-wide shadow-md animate-pulse">
            Premier Job Search Platform
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-[#2C3E50]">
            Launch Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2980B9] to-[#A9CCE3]">
              Dream Career
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-[#2C3E50] max-w-3xl mx-auto leading-relaxed">
            Discover a world of career opportunities tailored to your skills and
            ambitions. Your next role is just a search away.
          </p>

          {/* Search Bar */}
          <div className="flex w-full max-w-3xl mx-auto mt-8 shadow-xl bg-white border border-[#A9CCE3]/50 rounded-xl items-center pl-6 pr-3 py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(41,128,185,0.3)]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for your next career move..."
              className="outline-none border-none w-full bg-transparent text-[#2C3E50] placeholder-[#2C3E50]/60 font-medium text-lg"
              aria-label="Job Search Input"
            />
            <Button
              type="button"
              onClick={searchJobHandler}
              className="rounded-xl bg-gradient-to-r from-[#2980B9] to-[#A9CCE3] hover:from-[#1B6A99] hover:to-[#8BB8D8] transition-all duration-300 p-4 scale-100 hover:scale-105"
              aria-label="Search Jobs"
            >
              <Search className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
