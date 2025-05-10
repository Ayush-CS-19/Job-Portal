import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "../redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../utils/constants";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get/jobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };

    fetchAllAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;
