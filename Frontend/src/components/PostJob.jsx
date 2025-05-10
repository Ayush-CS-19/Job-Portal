import Navbar from "./Navbar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { JOBS_API_END_POINT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const PostJob = () => {
  const [formData, setFromdata] = useState({
    title: "",
    description: "",
    requirement: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setFromdata({ ...formData, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = (value) => {
    const selectedCompany = companies.find((company) => company._id === value);
    setFromdata({ ...formData, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOBS_API_END_POINT}/postjob`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#2C3E50]">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl border border-[#A9CCE3]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#2980B9]">
            Post a Job
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Title", name: "title" },
              { label: "Descriptions", name: "description" },
              { label: "Requirements", name: "requirement" },
              { label: "Salary", name: "salary" },
              { label: "Location", name: "location" },
              { label: "Job Type", name: "jobType" },
              { label: "Experience Level", name: "experience" },
              { label: "Number of Position", name: "position", type: "number" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <Label className="text-sm font-medium">{label}</Label>
                <Input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={changeEventHandler}
                  className="mt-1 bg-[#F5F7FA] border border-[#A9CCE3] focus-visible:ring-[#2980B9]"
                />
              </div>
            ))}
          </div>

          <div className="my-4">
            {companies.length > 0 && (
              <div>
                <Label className="text-sm font-medium">Select a Company</Label>
                <Select onValueChange={changeSelectHandler}>
                  <SelectTrigger className="mt-1 bg-[#F5F7FA] border border-[#A9CCE3]">
                    <SelectValue placeholder="Select A Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {loading ? (
            <Button className="w-full mt-4 bg-[#2980B9]" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-6 bg-[#2980B9] hover:bg-[#2471A3] text-white"
            >
              Post Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-semibold text-center mt-3">
              *Please register a company first before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
