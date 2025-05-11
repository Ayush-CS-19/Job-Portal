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
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Define the pagination skip value
    const skip = (page - 1) * limit;

    // Query to search using full-text search
    const query = keyword
      ? { $text: { $search: keyword } } // Use text search for better performance
      : {}; // If no keyword, return all jobs

    // Find jobs with pagination and text search (if keyword is provided)
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt
      .skip(skip) // Pagination skip
      .limit(limit) // Pagination limit
      .exec();

    if (!jobs || jobs.length === 0) {
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
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
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
