import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllapplicants } from "../redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../utils/constants";
import Navbar from "./Navbar";
import { ApplicantsTable } from "./ApplicantsTable";
import { logout } from "../redux/authSlice";
import { persistor } from "../redux/store";

export const AdminApplicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allApplicants } = useSelector((store) => store.application);
  const { isAuthenticated } = useSelector((store) => store.auth);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

        if (err.response?.status === 401 || err.response?.status === 403) {
          dispatch(logout());
          persistor.purge();
          navigate("/login", { replace: true });
        } else {
          console.error(err);
        }
      }
    };

    if (isAuthenticated) {
      fetchAllApplicants();
    }
  }, [params.id, dispatch, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">
          {allApplicants?.applications?.length || 0} Applicants
        </h1>
        <div className="bg-white rounded-lg shadow-md">
          <ApplicantsTable application={allApplicants} />
        </div>
      </div>
    </div>
  );
};
