import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

export const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job
  );
  const navigate = useNavigate();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <Table>
      <TableCaption className="text-[#2C3E50] mb-4">
        List of recently posted jobs
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-[#A9CCE3] hover:bg-[#A9CCE3]">
          <TableHead className="text-[#2C3E50] font-semibold">
            Company Name
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-center">
            Role
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-center">
            Date
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-center">
            Location
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-center">
            Job Type
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-center">
            Position
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-center">
            Applications
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-right">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterJobs.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="text-center text-[#2C3E50]">
              No jobs found!
            </TableCell>
          </TableRow>
        ) : (
          filterJobs.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-[#F5F7FA] transition-colors"
            >
              <TableCell className="text-[#2C3E50]">
                {job.company?.name || "N/A"}
              </TableCell>
              <TableCell className="text-[#2C3E50] text-center">
                {job.title}
              </TableCell>
              <TableCell className="text-[#2C3E50] text-center">
                {job.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-[#2C3E50] text-center">
                {job.location}
              </TableCell>
              <TableCell className="text-[#2C3E50] text-center">
                {job.jobType}
              </TableCell>
              <TableCell className="text-[#2C3E50] text-center">
                {job.position}
              </TableCell>
              <TableCell className="text-[#2C3E50] text-center">
                {job.applications?.length || "No applications"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-[#2980B9] hover:text-[#A9CCE3] cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-white shadow-md rounded-md border-[#A9CCE3]">
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                      className="flex items-center gap-2 p-2 text-[#2C3E50] hover:bg-[#F5F7FA] cursor-pointer rounded"
                    >
                      <Edit2 className="w-4 h-4 text-[#2980B9]" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}`)}
                      className="flex items-center gap-2 p-2 text-[#2C3E50] hover:bg-[#F5F7FA] cursor-pointer rounded"
                    >
                      <Eye className="w-4 h-4 text-[#2980B9]" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
