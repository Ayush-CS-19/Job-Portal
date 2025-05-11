import { Applications } from "../models/applications.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job is requeired",
        success: false,
      });
    }
    const exisitingApplication = await Applications.findOne({
      job: jobId,
      applicants: userId,
    });
    if (exisitingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }
    const newApplication = await Applications.create({
      job: jobId,
      applicants: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job Applied Successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Applications.find({ applicants: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          path:"applications"
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicants",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job is not Found",
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
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is Required",
        success: true,
      });
    }
    const application = await Applications.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application is Not Found",
        success: true,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (err) {}
};
