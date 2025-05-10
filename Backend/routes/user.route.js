import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";
const router = express.Router();
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuth, singleUpload, updateProfile);
router.route("/logout").get(isAuth, logout);
export default router;
