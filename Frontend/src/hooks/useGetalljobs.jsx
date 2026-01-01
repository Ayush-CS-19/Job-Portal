import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import { JOBS_API_END_POINT } from "../utils/constants";

const useGetalljobs = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((store) => store.job.searchQuery);

  useEffect(() => {
    const fetchAlljobs = async () => {
      try {
        const res = await axios.get(
          `${JOBS_API_END_POINT}/getall`,
          {
            params: { keyword: searchQuery }, 
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchAlljobs();
  }, [dispatch, searchQuery]); 
};

export default useGetalljobs;
