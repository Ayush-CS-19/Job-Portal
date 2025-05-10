import { useEffect } from "react";
import axios from "axios";
import { setAllAdminJobs } from "../redux/jobSlice";
import { useDispatch } from "react-redux";
import { JOBS_API_END_POINT } from "../utils/constants";
const useGetallAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminjobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/getadmin`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAdminjobs();
  }, []);
};
export default useGetallAdminJobs;
