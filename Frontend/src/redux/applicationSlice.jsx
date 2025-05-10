import { createSlice } from "@reduxjs/toolkit";
const applicationSlice = createSlice({
  name: "application",
  initialState: {
    allApplicants: [],
    allAppliedJobs: [],
  },
  reducers: {
    setAllapplicants: (state, action) => {
      state.allApplicants = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
  },
});
export const { setAllapplicants, setAllAppliedJobs } = applicationSlice.actions;
export default applicationSlice.reducer;
