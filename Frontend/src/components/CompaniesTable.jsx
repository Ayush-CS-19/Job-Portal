import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CompaniesTable = () => {
  const { companies = [], searchCompany = "" } = useSelector(
    (store) => store.company || {}
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompanies = companies.filter((company) => {
      if (!searchCompany) return true;
      return company?.name?.toLowerCase().includes(searchCompany.toLowerCase());
    });
    setFilterCompany(filteredCompanies);
  }, [companies, searchCompany]);

  return (
    <Table className="bg-white rounded-lg">
      <TableCaption className="text-[#2C3E50] mb-4">
        List of recently registered companies
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-[#A9CCE3] hover:bg-[#A9CCE3]">
          <TableHead className="text-[#2C3E50] font-semibold">Logo</TableHead>
          <TableHead className="text-[#2C3E50] font-semibold">Name</TableHead>
          <TableHead className="text-[#2C3E50] font-semibold">Date</TableHead>
          <TableHead className="text-right text-[#2C3E50] font-semibold">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterCompany.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-[#2C3E50] py-6">
              No companies found
            </TableCell>
          </TableRow>
        ) : (
          filterCompany.map((company) => (
            <TableRow
              key={company._id}
              className="border-b border-[#A9CCE3] hover:bg-[#F5F7FA] transition-colors"
            >
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="bg-[#A9CCE3] text-[#2C3E50]">
                    {company.name?.charAt(0) || "C"}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-[#2C3E50]">
                {company.name || "N/A"}
              </TableCell>
              <TableCell className="text-[#2C3E50]">
                {company.createdAt?.split("T")[0] || "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="h-5 w-5 text-[#2980B9] hover:text-[#A9CCE3] cursor-pointer transition-colors" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white border-[#A9CCE3] shadow-md rounded-md">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 text-[#2C3E50] hover:bg-[#F5F7FA] cursor-pointer rounded"
                    >
                      <Edit2 className="h-4 w-4 text-[#2980B9]" />
                      <span>Edit</span>
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
