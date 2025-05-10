import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompany: "",
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyby: (state, action) => {
      state.searchCompany = action.payload;
    },
  },
});
export const { setSingleCompany, setCompanies, setSearchCompanyby } =
  companySlice.actions;
export default companySlice.reducer;
