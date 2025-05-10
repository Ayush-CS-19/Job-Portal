import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Herosection } from "./Herosection";
import { Categorycarousel } from "./Categorycarousel";
import { Latestjob } from "./Latestjob";
import { Footer } from "./Footer";
import useGetalljobs from "@/hooks/useGetalljobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  useGetalljobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Herosection />
      <Categorycarousel />
      <Latestjob />
      <Footer />
    </div>
  );
};
export default Home;
