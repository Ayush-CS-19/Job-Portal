import React, { useEffect } from "react";
import axios from "axios";
import { setAllJobs } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { JOBS_API_END_POINT } from "../utils/constants";

const useGetalljobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAlljobs = async () => {
      try {
        const res = await axios.get(
          `${JOBS_API_END_POINT}/getall?keyword=${searchQuery}`,
          {
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
  }, [searchQuery, dispatch]);
};

export default useGetalljobs;
