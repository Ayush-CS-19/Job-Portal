import express from "express";
import {
  getJobByID,
  postJob,
  getAllJob,
  getAdminJobs,
} from "../controllers/job.controller.js";
import isAuth from "../middlewares/isAuth.js";
const router = express.Router();
router.route("/postjob").post(isAuth, postJob);
router.route("/getall").get(isAuth, getAllJob);
router.route("/get/:id").get(isAuth, getJobByID);
router.route("/getadmin").get(isAuth, getAdminJobs);
export default router;
