import { company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name is Required",
        success: false,
      });
    }
    let Company = await company.findOne({ name: companyName.trim() });
    if (Company) {
      return res.status(400).json({
        message: "You can,t register same company",
        success: false,
      });
    }
    Company = await company.create({
      name: companyName.trim(),
      userId: req.id,
    });
    return res.status(200).json({
      message: "Company Registered Successfully",
      companyId: Company._id,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "We found all the companies",
      companies,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const Company = await company.findById(companyId);
    if (!Company) {
      return res.status(404).json({
        message: "Company is Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      Company,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileURI = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileURI.content);
    const logo = cloudResponse.secure_url;
    const updateData = { name, description, website, location, logo };
    const Company = await company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!Company) {
      res.status(404).json({
        message: "Company Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Information Updated",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
