import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constants";
import { setCompanies } from "../redux/companySlice";
const useGetallCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCompany();
  }, []);
};

export default useGetallCompany;
