import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, loginSuccess } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, isAuthenticated } = useSelector(
    (store) => store.auth
  );

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ✅ Correct redirect logic
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-12">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-1/2 bg-white rounded-xl p-6 shadow-lg border border-[#A9CCE3]/50"
        >
          <h1 className="font-bold text-2xl mb-6">Login</h1>

          <div className="my-4">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-4">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-4">
            <Label>Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput({ ...input, role: value })
              }
              className="flex gap-6"
            >
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student">Student</Label>

              <RadioGroupItem value="recruiter" id="recruiter" />
              <Label htmlFor="recruiter">Recruiter</Label>
            </RadioGroup>
          </div>

          <Button type="submit" disabled={loading} className="w-full my-4">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
