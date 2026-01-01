import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "../utils/constants";
import { setSingleCompany } from "../redux/companySlice";

const useGetcompanybyid = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.Company));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSingleCompany();
  }, [dispatch, companyId]);
};

export default useGetcompanybyid;
