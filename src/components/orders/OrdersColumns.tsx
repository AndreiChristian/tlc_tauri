import { getFormattedDay } from "@/utils/getFormattedDay"
import { ColumnDef } from "@tanstack/react-table"
import { RecordModel } from "pocketbase"

export interface OrderRecord extends RecordModel {
  total: number
  furnizor: string
  description: string

}

export const columns: ColumnDef<OrderRecord>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "description",
    header: "Descriere",
  },
  {
    accessorKey: "furnizor",
    header: "Furnizor",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "created",
    header: "Data",
    cell: ({ row }) => {
      const created = row.getValue("created") as string
      const createdDate = new Date(created)
      const formated = getFormattedDay(createdDate)
      return <div className="font-bold">{formated}</div>
    }
  }
]


