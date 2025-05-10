import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOuthandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="relative bg-[#F5F7FA] shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            <Link to="/" className="text-[#2C3E50]">
              Jobs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2980B9] to-[#A9CCE3]">
                Portal
              </span>
            </Link>
          </h1>
        </div>

        {/* Navigation Links and User Actions */}
        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <ul className="flex font-semibold items-center gap-6 text-[#2C3E50]">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="relative text-sm uppercase tracking-wide hover:text-[#2980B9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2980B9] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="relative text-sm uppercase tracking-wide hover:text-[#2980B9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2980B9] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="relative text-sm uppercase tracking-wide hover:text-[#2980B9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2980B9] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="relative text-sm uppercase tracking-wide hover:text-[#2980B9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2980B9] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="relative text-sm uppercase tracking-wide hover:text-[#2980B9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#2980B9] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User Actions */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#A9CCE3] text-[#2C3E50] hover:bg-[#A9CCE3]/20 hover:text-[#2980B9] transition-all duration-300"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-[#2980B9] to-[#A9CCE3] hover:from-[#1B6A99] hover:to-[#8BB8D8] transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#A9CCE3]/50 hover:ring-[#2980B9] transition-all duration-300">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.name}
                  />
                  <AvatarFallback className="bg-[#A9CCE3] text-[#2C3E50]">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white border border-[#A9CCE3]/50 rounded-xl shadow-xl">
                <div className="flex gap-4 p-4">
                  <Avatar className="ring-2 ring-[#A9CCE3]/50">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.name}
                    />
                    <AvatarFallback className="bg-[#A9CCE3] text-[#2C3E50]">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-lg text-[#2C3E50]">
                      {user?.name}
                    </h4>
                    <p className="text-sm text-[#2C3E50]/70 truncate">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-2">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#A9CCE3]/20 transition-colors duration-300">
                      <User2 className="h-5 w-5 text-[#2980B9]" />
                      <Button
                        variant="ghost"
                        className="text-[#2C3E50] hover:text-[#2980B9] w-full justify-start"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#A9CCE3]/20 transition-colors duration-300">
                    <LogOut className="h-5 w-5 text-[#2980B9]" />
                    <Button
                      onClick={logOuthandler}
                      variant="ghost"
                      className="text-[#2C3E50] hover:text-[#2980B9] w-full justify-start"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
