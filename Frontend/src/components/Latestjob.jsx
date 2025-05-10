import React from "react";
import { useSelector } from "react-redux";
import { Latestjobcards } from "./Latestjobcards";

export const Latestjob = () => {
  const { allJob } = useSelector((store) => store.job);

  return (
    <div className="bg-[#F5F7FA] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-8">
          <span className="text-[#2980B9]">Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJob.length <= 0 ? (
            <div className="col-span-full text-center">
              <p className="text-lg text-[#2C3E50]/80">
                No jobs available at the moment.
              </p>
            </div>
          ) : (
            allJob
              ?.slice(0, 6)
              .map((job) => <Latestjobcards key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};
