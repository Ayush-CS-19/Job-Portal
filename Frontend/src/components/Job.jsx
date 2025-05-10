import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

export const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-6 rounded-xl bg-[#F5F7FA] border border-[#A9CCE3]/50 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header: Time and Bookmark */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-[#2C3E50]/70">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} Days Ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full border-[#A9CCE3] text-[#2C3E50] hover:bg-[#A9CCE3]/20 hover:text-[#2980B9] transition-all duration-300"
          size="icon"
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          className="p-0 bg-transparent border-none"
          variant="outline"
          size="icon"
        >
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={job?.company?.logo || ""}
              className="object-cover rounded-full"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-lg text-[#2C3E50]">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-[#2C3E50]/70">{job?.location}, India</p>
        </div>
      </div>

      {/* Job Details */}
      <div>
        <h1 className="font-bold text-xl text-[#2C3E50] mb-2">{job?.title}</h1>
        <p className="text-sm text-[#2C3E50]/80 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge
          className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="border-[#A9CCE3] text-[#2C3E50] hover:bg-[#A9CCE3]/20 hover:text-[#2980B9] transition-all duration-300"
        >
          Details
        </Button>
        <Button className="bg-gradient-to-r from-[#2980B9] to-[#A9CCE3] hover:from-[#1B6A99] hover:to-[#8BB8D8] text-white transition-all duration-300">
          Save For Later
        </Button>
      </div>
    </div>
  );
};
