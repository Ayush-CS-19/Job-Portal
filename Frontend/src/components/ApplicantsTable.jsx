import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./ui/table";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../utils/constants";
import { Link } from "react-router-dom";

export const ApplicantsTable = ({ application }) => {
  const shortlistingStatus = ["Accepted", "Rejected"];

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Table>
      <TableCaption className="text-[#2C3E50] mb-4">
        List of recent applicants
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-[#A9CCE3] hover:bg-[#A9CCE3]">
          <TableHead className="text-[#2C3E50] font-semibold">
            Full Name
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold">Email</TableHead>
          <TableHead className="text-[#2C3E50] font-semibold">
            Contact
          </TableHead>
          <TableHead className="text-[#2C3E50] font-semibold">Resume</TableHead>
          <TableHead className="text-[#2C3E50] font-semibold">Date</TableHead>
          <TableHead className="text-[#2C3E50] font-semibold text-right">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {application?.applications?.length ? (
          application.applications.map((item) => (
            <TableRow
              key={item?._id}
              className="hover:bg-[#F5F7FA] transition-colors"
            >
              <TableCell className="text-[#2C3E50]">
                {item?.applicants?.name || "N/A"}
              </TableCell>
              <TableCell className="text-[#2C3E50]">
                {item?.applicants?.email}
              </TableCell>
              <TableCell className="text-[#2C3E50]">
                +91{item?.applicants?.phoneNumber}
              </TableCell>
              <TableCell>
                <Link
                  to
                  l={item?.applicants?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2980B9] hover:text-[#A9CCE3] underline transition-colors"
                >
                  View
                </Link>
              </TableCell>
              <TableCell className="text-[#2C3E50]">
                {item?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-[#2980B9] hover:text-[#A9CCE3] cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-white shadow-md rounded-md border-[#A9CCE3]">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item._id)}
                        className="flex items-center p-2 text-[#2C3E50] hover:bg-[#F5F7FA] cursor-pointer rounded"
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-[#2C3E50]">
              No applicants found!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
