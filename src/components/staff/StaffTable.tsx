import {
  Card,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Staff } from "@/pb/types";
import { EllipsisIcon } from "lucide-react";

export default function StaffTable({ records }: { records: Staff[] }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Prenume</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="">Actiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map(r => (
            <TableRow key={r.id} >
              <TableCell className="font-medium">{r.id}</TableCell>
              <TableCell>{r.familyName}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.role}</TableCell>
              <TableCell className="text-right"><EllipsisIcon /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>

  )

}
