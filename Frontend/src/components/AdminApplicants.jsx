import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllapplicants } from "../redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../utils/constants";
import Navbar from "./Navbar";
import { ApplicantsTable } from "./ApplicantsTable";

export const AdminApplicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllapplicants(res.data.job));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-[#2C3E50] mb-6">
          {allApplicants?.applications?.length || 0} Applicants
        </h1>
        <div className="bg-white rounded-lg shadow-md">
          <ApplicantsTable application={allApplicants} />
        </div>
      </div>
    </div>
  );
};
