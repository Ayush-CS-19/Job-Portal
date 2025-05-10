import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-1/2 bg-white rounded-xl p-6 shadow-lg border border-[#A9CCE3]/50"
        >
          <h1 className="font-bold text-2xl text-[#2C3E50] mb-6">Sign Up</h1>

          {/* Full Name Input */}
          <div className="my-4">
            <Label className="text-[#2C3E50] font-semibold">Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="bg-[#A9CCE3]/10 border-[#A9CCE3]/50 text-[#2C3E50] focus:bg-[#A9CCE3]/20 transition-all duration-300"
              aria-label="Full name"
            />
          </div>

          {/* Email Input */}
          <div className="my-4">
            <Label className="text-[#2C3E50] font-semibold">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="bg-[#A9CCE3]/10 border-[#A9CCE3]/50 text-[#2C3E50] focus:bg-[#A9CCE3]/20 transition-all duration-300"
              aria-label="Email address"
            />
          </div>

          {/* Phone Number Input */}
          <div className="my-4">
            <Label className="text-[#2C3E50] font-semibold">Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="bg-[#A9CCE3]/10 border-[#A9CCE3]/50 text-[#2C3E50] focus:bg-[#A9CCE3]/20 transition-all duration-300"
              aria-label="Phone number"
            />
          </div>

          {/* Password Input */}
          <div className="my-4">
            <Label className="text-[#2C3E50] font-semibold">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="bg-[#A9CCE3]/10 border-[#A9CCE3]/50 text-[#2C3E50] focus:bg-[#A9CCE3]/20 transition-all duration-300"
              aria-label="Password"
            />
          </div>

          {/* Role Selection */}
          <div className="my-4">
            <Label className="text-[#2C3E50] font-semibold">Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="flex items-center gap-6 mt-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="student"
                  id="student"
                  className="border-[#A9CCE3] text-[#2980B9]"
                />
                <Label
                  htmlFor="student"
                  className="text-[#2C3E50] cursor-pointer"
                >
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="recruiter"
                  id="recruiter"
                  className="border-[#A9CCE3] text-[#2980B9]"
                />
                <Label
                  htmlFor="recruiter"
                  className="text-[#2C3E50] cursor-pointer"
                >
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Profile Picture Upload */}
          <div className="my-4">
            <Label className="text-[#2C3E50] font-semibold">
              Profile Picture
            </Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="bg-[#A9CCE3]/10 border-[#A9CCE3]/50 text-[#2C3E50] focus:bg-[#A9CCE3]/20 transition-all duration-300 cursor-pointer"
              aria-label="Profile picture upload"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full my-4 font-semibold text-white transition-all duration-300 ${
              loading
                ? "bg-[#2C3E50]/50 cursor-not-allowed"
                : "bg-gradient-to-r from-[#2980B9] to-[#A9CCE3] hover:from-[#1B6A99] hover:to-[#8BB8D8]"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-[#2C3E50]/80">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#2980B9] font-semibold hover:text-[#1B6A99] transition-colors duration-300"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
