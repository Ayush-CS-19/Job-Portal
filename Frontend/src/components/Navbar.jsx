import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { logout } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOuthandler = async () => {
    try {
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      dispatch(logout());
      persistor.purge(); 
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <div className="relative bg-[#F5F7FA] shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold">
          <Link to="/" className="text-[#2C3E50]">
            Jobs{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2980B9] to-[#A9CCE3]">
              Portal
            </span>
          </Link>
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <ul className="flex font-semibold gap-6">
            {isAuthenticated && user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Auth Actions */}
          {!isAuthenticated ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72">
                <div className="flex gap-4 p-4">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 px-2 pb-2">
                  {user?.role === "student" && (
                    <Button variant="ghost" asChild>
                      <Link to="/profile">
                        <User2 className="mr-2 h-4 w-4" /> View Profile
                      </Link>
                    </Button>
                  )}

                  <Button variant="ghost" onClick={logOuthandler}>
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </Button>
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
