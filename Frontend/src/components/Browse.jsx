import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Job } from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/jobSlice";
import useGetalljobs from "../hooks/useGetalljobs";

export const Browse = () => {
  const dispatch = useDispatch();

  // Ensure jobs are fetched using searchQuery
  useGetalljobs();

  const { allJob = [] } = useSelector((store) => store.job);

  // Clear search query when component unmounts (for cleanup)
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery("")); // ✅ Only resets on unmount
    };
  }, [dispatch]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-12 px-4">
        <h1 className="font-bold text-2xl text-[#2C3E50] my-8 flex items-center">
          Search Results
          <span className="ml-2 text-[#2980B9] bg-[#A9CCE3]/20 px-3 py-1 rounded-full text-lg font-semibold">
            {allJob.length}
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJob.length > 0 ? (
            allJob.map((job) => (
              <div
                key={job._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Job job={job} />
              </div>
            ))
          ) : (
            <p className="text-[#2C3E50]/80 text-center col-span-full text-lg">
              No jobs found. Try adjusting your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
