import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllAppliedJobs } from "../redux/applicationSlice";
import { APPLICATION_API_END_POINT } from "../utils/constants";

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get/jobs?keyword=${searchQuery}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };

    fetchAllAppliedJobs();
  }, [dispatch, searchQuery]); 
};

export default useGetAllAppliedJobs;
