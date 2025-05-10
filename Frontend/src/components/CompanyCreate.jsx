import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetcompanybyid from "@/hooks/useGetcompanybyid";

export const CompanyCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { singleCompany } = useSelector((store) => store.company);

  useGetcompanybyid({ companyId: params.id });

  useEffect(() => {
    setFormData({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
    setPreview(singleCompany?.logo || null);
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, description, website, location } = formData;
    if (!name || !description || !website || !location) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formCreate = new FormData();
    formCreate.append("name", name);
    formCreate.append("description", description);
    formCreate.append("website", website);
    formCreate.append("location", location);
    if (formData.file) {
      formCreate.append("file", formData.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formCreate,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form
          onSubmit={submitHandler}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 border-[#A9CCE3] text-[#2C3E50] hover:bg-[#F5F7FA] rounded-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold text-[#2C3E50]">
              Update Company
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-[#2C3E50] font-semibold">
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeEventHandler}
                id="name"
                className="mt-1 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] rounded-md"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="text-[#2C3E50] font-semibold"
              >
                Description
              </Label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={changeEventHandler}
                id="description"
                className="mt-1 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] rounded-md"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-[#2C3E50] font-semibold">
                Website
              </Label>
              <Input
                type="text"
                name="website"
                value={formData.website}
                onChange={changeEventHandler}
                id="website"
                className="mt-1 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] rounded-md"
              />
            </div>
            <div>
              <Label
                htmlFor="location"
                className="text-[#2C3E50] font-semibold"
              >
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={changeEventHandler}
                id="location"
                className="mt-1 bg-white border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50] rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="logo" className="text-[#2C3E50] font-semibold">
                Logo
              </Label>
              <Input
                type="file"
                name="logo"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1 bg-white border-[#A9CCE3] text-[#2C3E50] rounded-md"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Logo Preview"
                  className="mt-4 h-24 object-contain border border-[#A9CCE3] rounded-md p-2"
                />
              )}
            </div>
          </div>

          <div className="mt-8">
            {loading ? (
              <Button
                className="w-full bg-[#2980B9] text-white rounded-md"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-[#2980B9] hover:bg-[#A9CCE3] text-white font-semibold rounded-md transition-colors"
              >
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
