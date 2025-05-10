// Profile.jsx
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Pen, Mail, Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Appliedjob } from "./Appliedjob";
import { UpdateProfileDialog } from "./UpdateProfileDialog";
import useGetAllAppliedJobs from "../hooks/useGetallAppliedJobs";
import { useSelector } from "react-redux";

export const Profile = () => {
  useGetAllAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl text-[#2C3E50]">
                {user?.name}
              </h1>
              <p className="text-[#2C3E50]">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-[#2980B9] border-[#2980B9] hover:bg-[#A9CCE3] hover:text-[#2C3E50]"
            variant="outline"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 text-[#2C3E50]">
            <Mail className="h-5 w-5 text-[#2980B9]" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2 text-[#2C3E50]">
            <Contact className="h-5 w-5 text-[#2980B9]" />
            <span>{user?.phoneNumber}</span>
          </div>
          <div className="my-5">
            <h1 className="font-bold text-lg text-[#2C3E50]">Skills</h1>
            <div className="flex items-center gap-1 my-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    key={index}
                    className="bg-[#A9CCE3] text-[#2C3E50] hover:bg-[#2980B9] hover:text-white"
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span className="text-[#2C3E50]">NA</span>
              )}
            </div>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold text-[#2C3E50]">Resume</Label>
          {isResume ? (
            <Link
              target="_blank"
              className="text-[#2980B9] hover:text-[#2C3E50] transition-colors"
              to={user?.profile?.resume}
            >
              {user?.profile?.resumeOriginalName}
            </Link>
          ) : (
            <span className="text-[#2C3E50]">NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8">
        <h1 className="font-bold text-lg text-[#2C3E50]">Applied Jobs</h1>
        <Appliedjob />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};
