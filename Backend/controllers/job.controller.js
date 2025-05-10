import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New Job Created Successfully",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .populate({
        path: "created_by",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getJobByID = async (req, res) => {
  try {
    const JobId = req.params.id;
    const job = await Job.findById(JobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job is Found",
      job,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Job is Found",
      jobs,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
