import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  singleCompany: null,
  searchCompanyby: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setSearchCompanyby: (state, action) => {
      state.searchCompanyby = action.payload;
    },
  },
});

export const {
  setCompanies,
  setSingleCompany,
  setSearchCompanyby,
} = companySlice.actions;

export default companySlice.reducer;
