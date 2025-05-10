import express from "express";
import {
  registerCompany,
  updateCompany,
  getCompany,
  getCompanyById,
} from "../controllers/company.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();
router.route("/register").post(isAuth, registerCompany);
router.route("/get").get(isAuth, getCompany);
router.route("/get/:id").get(isAuth, getCompanyById);
router.route("/update/:id").put(isAuth, singleUpload, updateCompany);
export default router;
