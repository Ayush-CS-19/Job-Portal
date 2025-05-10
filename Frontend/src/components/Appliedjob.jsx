import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";
import { useSelector } from "react-redux";

import { Badge } from "./ui/badge";
export const Appliedjob = () => {
  const { allAppliedJobs } = useSelector((store) => store.application);
  return (
    <div>
      <Table>
        <TableCaption>A list of the Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You Didn't Apply For Any Job</span>
          ) : (
            allAppliedJobs.map((item) => {
              return (
                <TableRow key={item?._id}>
                  <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{item?.job?.title}</TableCell>
                  <TableCell>{item?.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge>{item?.status.toUpperCase()}</Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};
