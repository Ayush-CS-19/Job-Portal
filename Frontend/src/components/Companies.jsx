import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CompaniesTable } from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetallCompany from "../hooks/useGetallCompany";
import { useDispatch } from "react-redux";
import { setSearchCompanyby } from "../redux/companySlice";

export const Companies = () => {
  useGetallCompany();
  const [searchCompany, setSearchCompany] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyby(searchCompany));
  }, [searchCompany, dispatch]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <Input
            className="w-80 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] placeholder:text-[#2C3E50]/60 rounded-md"
            placeholder="Filter by Name"
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-[#2980B9] hover:bg-[#A9CCE3] text-white font-semibold rounded-md px-6 py-2 transition-colors"
          >
            New Company
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};
