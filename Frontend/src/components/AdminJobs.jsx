import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setsearchJobByText } from "../redux/jobSlice";
import useGetallAdminJobs from "../hooks/useGetallAdminJobs";
import Navbar from "./Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AdminJobsTable } from "./AdminJobsTable";

export const AdminJobs = () => {
  useGetallAdminJobs();
  const [searchCompany, setSearchCompany] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setsearchJobByText(searchCompany));
  }, [searchCompany, dispatch]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <Input
            className="w-80 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] rounded-md"
            placeholder="Filter by Name/Role"
            onChange={(e) => setSearchCompany(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-[#2980B9] hover:bg-[#A9CCE3] text-white font-semibold rounded-md px-6 py-2 transition-colors"
          >
            Post New Job
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};
