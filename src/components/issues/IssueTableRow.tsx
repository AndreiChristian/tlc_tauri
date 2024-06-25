import { RecordModel } from "pocketbase";
import { TableCell, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { useUpdate } from "@/pb/hooks/useUpdate";
import { useToast } from "../ui/use-toast";

export default function IssueTableRow({ issue, refetch }: { issue: RecordModel, refetch: () => void }) {

  const { updateItem } = useUpdate(issue.id, issue.collectionName)
  const { toast } = useToast()

  return (
    <TableRow key={issue.id} >
      <TableCell className="font-medium">{issue.id}</TableCell>
      <TableCell>{issue.title}</TableCell>
      <TableCell className="max-w-xs whitespace-normal break-words" >{issue.description || "Nu exista descriere"}</TableCell>
      <TableCell>
        {issue.solved ? "Rezolvat" : "Nerezolvat"}</TableCell>
      <TableCell className="">

        {issue.urgent ?
          <span className="bg-destructive text-destructive-foreground box-border p-2 rounded" >Urgent</span>
          : "-"}
      </TableCell>
      <TableCell>{issue.created}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => {
              const data = {
                ...issue,
                solved: true
              }
              updateItem(data).then(() => {
                refetch()
                toast({
                  title: "Element modificat cu success"
                })
              }).catch(e => toast({
                variant: "destructive",
                title: "A aparut o eroare"
              }))
            }} >
              Inchide ca rezolvat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </TableCell>
    </TableRow>

  )
}
