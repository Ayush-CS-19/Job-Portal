import React, { useState } from "react";
import Navbar from "./Navbar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "../utils/constants";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/companySlice";

export const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.companyId;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create company");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-[#2C3E50] mb-2">
            Create Your Company
          </h1>
          <p className="text-[#2C3E50] mb-6">
            What would you like to name your company? You can change this later.
          </p>
          <div className="max-w-md">
            <Label
              htmlFor="companyName"
              className="text-[#2C3E50] font-semibold"
            >
              Company Name
            </Label>
            <Input
              type="text"
              id="companyName"
              className="mt-1 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] rounded-md"
              placeholder="e.g., JobHunt Inc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="border-[#A9CCE3] text-[#2C3E50] hover:bg-[#F5F7FA] rounded-md"
            >
              Cancel
            </Button>
            <Button
              onClick={registerNewCompany}
              className="bg-[#2980B9] hover:bg-[#A9CCE3] text-white font-semibold rounded-md transition-colors"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
