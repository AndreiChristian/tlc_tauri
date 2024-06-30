import { Staff } from "@/pb/types";
import { TableCell, TableRow } from "../ui/table";
import { EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDelete } from "@/pb/hooks/useDelete";
import { useToast } from "../ui/use-toast";
import { useUpdate } from "@/pb/hooks/useUpdate";


export default function StaffTableRow({ r, refetch }: { r: Staff, refetch: () => void }) {

  const { deleteItem } = useDelete(r.id, r.collectionName)
  const { updateItem } = useUpdate(r.id, r.collectionName)
  const { toast } = useToast()

  const handleUpdate = () => {
    const data = {
      ...r,
      active: !r.active
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
  }

  return (
    <TableRow key={r.id} >
      <TableCell className="font-medium">{r.id}</TableCell>
      <TableCell className="font-bold" >{r.familyName.toUpperCase()}</TableCell>
      <TableCell>{r.name}</TableCell>
      <TableCell>{r.role}</TableCell>
      <TableCell>{r.active ? "Activ" : "Inactiv"}</TableCell>
      <TableCell className="flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actiuni</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleUpdate}
            >Seteaza ca {r.active ? "inactiv" : "activ"}</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => (
                deleteItem().then(() => (
                  refetch(),
                  toast({
                    title: "ELement sters cu success"
                  })
                )).catch(e => toast({ variant: "destructive", title: "A aparut o eroare" }))
              )}
              className="bg-destructive text-destructive-foreground hover:text-destructive hover:bg-destructive-foreground "  >Sterge</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow >
  )
}
