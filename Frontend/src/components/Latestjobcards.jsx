import React from "react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

export const Latestjobcards = ({ job }) => {
  return (
    <Link
      to={`/description/${job?._id}`}
      className="block p-5 rounded-xl bg-white border border-[#A9CCE3]/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-semibold text-lg text-[#2C3E50]">
          {job?.company?.name || "Company Name"}
        </h1>
        <p className="text-sm text-[#2C3E50]/70">
          {job?.location ? `${job.location}, India` : "Location N/A"}
        </p>
      </div>

      {/* Job Info */}
      <div className="mt-3">
        <h1 className="font-bold text-xl text-[#2C3E50]">
          {job?.title || "Job Title"}
        </h1>
        <p className="text-sm text-[#2C3E50]/80 line-clamp-2 mt-1">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge
          className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
          variant="ghost"
        >
          {job?.position || 0} Positions
        </Badge>
        <Badge
          className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
          variant="ghost"
        >
          {job?.jobType || "N/A"}
        </Badge>
        <Badge
          className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
          variant="ghost"
        >
          {job?.salary || "0"} LPA
        </Badge>
      </div>
    </Link>
  );
};
