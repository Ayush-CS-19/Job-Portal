import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJob: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    searchQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJob = action.payload;
    },
    setSinglejob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setsearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setSinglejob,
  setAllAdminJobs,
  setsearchJobByText,
  setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
