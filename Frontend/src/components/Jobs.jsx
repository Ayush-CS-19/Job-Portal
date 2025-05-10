import React, { useEffect, useState } from "react";
import { Filterjob } from "./Filterjob";
import Navbar from "./Navbar";
import { Job } from "./Job";
import { useSelector } from "react-redux";

export const Jobs = () => {
  const { allJob = [], searchQuery = "" } = useSelector((store) => store.job);
  const [filterJob, setFilterJobs] = useState([]);

  useEffect(() => {
    const trimmedQuery =
      typeof searchQuery === "string" ? searchQuery.trim().toLowerCase() : "";

    if (trimmedQuery !== "") {
      const filtered = allJob.filter((job) =>
        [job?.title, job?.description, job?.location].some((field) =>
          field?.toLowerCase().includes(trimmedQuery)
        )
      );
      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJob);
    }
  }, [allJob, searchQuery]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen text-[#2C3E50]">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="w-full md:w-[20%]">
            <Filterjob />
          </div>

          {/* Job Grid */}
          <div className="flex-1">
            {filterJob.length === 0 ? (
              <div className="flex items-center justify-center h-[60vh]">
                <p className="text-lg text-[#2C3E50]/80">
                  No jobs found. Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="h-[80vh] overflow-y-auto pb-6 pr-2 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterJob.map((job) => (
                    <div
                      key={job?._id}
                      className="transform hover:scale-105 transition-transform duration-300"
                    >
                      <Job job={job} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
