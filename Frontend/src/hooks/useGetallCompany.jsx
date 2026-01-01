import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constants";
import { setCompanies } from "../redux/companySlice";

const useGetallCompany = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job); 

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get?keyword=${searchQuery}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllCompany();
  }, [dispatch, searchQuery]); 
};

export default useGetallCompany;
