import React, { useState } from "react";
import { Label } from "./ui/label";
import { USER_API_END_POINT } from "../utils/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.join(",") || "", // Convert array to comma-separated string
    file: null, // File input starts as null
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills); // Send as comma-separated string
    if (input.file) {
      formData.append("file", input.file);
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/profile");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px] bg-white"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-[#2C3E50] text-xl font-bold">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-[#2C3E50]">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="col-span-3 border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-[#2C3E50]">
                  E-Mail
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3 border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="phoneNumber"
                  className="text-right text-[#2C3E50]"
                >
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3 border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right text-[#2C3E50]">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  type="text"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3 border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right text-[#2C3E50]">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  placeholder="e.g., JavaScript, Python, React"
                  className="col-span-3 border-[#A9CCE3] focus:ring-[#2980B9] focus:border-[#2980B9] text-[#2C3E50]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right text-[#2C3E50]">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="col-span-3 border-[#A9CCE3] text-[#2C3E50]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full my-4 bg-[#2980B9] hover:bg-[#A9CCE3] text-white hover:text-[#2C3E50] transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
