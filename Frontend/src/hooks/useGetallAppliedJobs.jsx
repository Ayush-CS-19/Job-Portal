import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";
import { JOBS_API_END_POINT } from "../utils/constants";

const useGetallAdminJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          `${JOBS_API_END_POINT}/getadmin?keyword=${searchQuery}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch, searchQuery]); // ✅ IMPORTANT
};

export default useGetallAdminJobs;
