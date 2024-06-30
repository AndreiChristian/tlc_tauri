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
import StaffTableRow from "./StaffTableRow";

export default function StaffTable({ records, refetch }: { records: Staff[], refetch: () => void }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Prenume</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Activ</TableHead>
            <TableHead className="">Actiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map(r => <StaffTableRow r={r} key={r.id} refetch={refetch} />
          )}
        </TableBody>
      </Table>
    </Card>

  )

}
