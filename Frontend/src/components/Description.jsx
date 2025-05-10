import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSinglejob } from "../redux/jobSlice";
import {
  APPLICATION_API_END_POINT,
  JOBS_API_END_POINT,
} from "../utils/constants";

export const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const isApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isInitial, setInitial] = useState(isApplied);
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setInitial(true);
        const updateSingle = {
          ...singleJob,
          applications: [...singleJob?.applications, { applicant: user?._id }],
        };
        dispatch(setSinglejob(updateSingle));
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchSinglejobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSinglejob(res.data.job));
          setInitial(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSinglejobs();
  }, [jobId, dispatch, user?._id]);

  // Format posted date
  const formatPostedDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "04-05-2025";

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl p-6 shadow-lg border border-[#A9CCE3]/50 mb-8">
          <div>
            <h1 className="font-bold text-2xl text-[#2C3E50]">
              {singleJob?.title || "Job Title"}
            </h1>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <Badge
                className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
                variant="ghost"
              >
                {singleJob?.position || 0} Positions
              </Badge>
              <Badge
                className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
                variant="ghost"
              >
                {singleJob?.jobType || "N/A"}
              </Badge>
              <Badge
                className="bg-[#A9CCE3]/20 text-[#2980B9] font-semibold hover:bg-[#A9CCE3]/40 transition-colors duration-300"
                variant="ghost"
              >
                {singleJob?.salary || "0"} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isInitial ? null : applyJobHandler}
            disabled={isInitial}
            className={`mt-4 sm:mt-0 rounded-lg text-white font-semibold transition-all duration-300 ${
              isInitial
                ? "bg-[#2C3E50]/50 cursor-not-allowed"
                : "bg-gradient-to-r from-[#2980B9] to-[#A9CCE3] hover:from-[#1B6A99] hover:to-[#8BB8D8]"
            }`}
          >
            {isInitial ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#A9CCE3]/50 mb-8">
          <h2 className="text-lg font-semibold text-[#2C3E50] border-b border-[#A9CCE3]/50 pb-3 mb-4">
            Job Description
          </h2>
          <p className="text-[#2C3E50]/80 text-sm leading-relaxed">
            {singleJob?.description || "No description available."}
          </p>
        </div>

        {/* Details Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-[#A9CCE3]/50">
          <h2 className="text-lg font-semibold text-[#2C3E50] mb-4">
            Job Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-[#2C3E50]">
                Role:
                <span className="ml-2 font-normal text-[#2C3E50]/80">
                  {singleJob?.title || "N/A"}
                </span>
              </h3>
              <h3 className="font-semibold text-[#2C3E50] mt-2">
                Location:
                <span className="ml-2 font-normal text-[#2C3E50]/80">
                  {singleJob?.location || "N/A"}
                </span>
              </h3>
              <h3 className="font-semibold text-[#2C3E50] mt-2">
                Experience:
                <span className="ml-2 font-normal text-[#2C3E50]/80">
                  {singleJob?.experience || 0} Years
                </span>
              </h3>
            </div>
            <div>
              <h3 className="font-semibold text-[#2C3E50]">
                Salary:
                <span className="ml-2 font-normal text-[#2C3E50]/80">
                  {singleJob?.salary || "0"} LPA
                </span>
              </h3>
              <h3 className="font-semibold text-[#2C3E50] mt-2">
                Total Applicants:
                <span className="ml-2 font-normal text-[#2C3E50]/80">
                  {singleJob?.applications?.length || 0}
                </span>
              </h3>
              <h3 className="font-semibold text-[#2C3E50] mt-2">
                Posted Date:
                <span className="ml-2 font-normal text-[#2C3E50]/80">
                  {formatPostedDate(singleJob?.createdAt)}
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
