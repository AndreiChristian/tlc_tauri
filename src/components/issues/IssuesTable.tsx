import { RecordModel } from "pocketbase"
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "../ui/card"
import IssueTableRow from "./IssueTableRow"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function IssuesTable({ issues, refetch }: { issues: RecordModel[], refetch: () => void }) {

  if (issues.length == 0) {
    return <Alert>
      <AlertTitle>Nu exista probleme semnalate!</AlertTitle>
      <AlertDescription>
        Daca exista probleme, le poti semnala creand o problema noua din butonul din dreapta sus!
      </AlertDescription>
    </Alert>
  }

  return (
    <Card>
      <Table  >
        <TableCaption>Lista cu probleme.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Numar</TableHead>
            <TableHead>Titlu</TableHead>
            <TableHead>Descriere</TableHead>
            <TableHead className="">Statut</TableHead>
            <TableHead className="">Urgenta</TableHead>
            <TableHead className="">Creat la</TableHead>
            <TableHead className="">Actiuni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            issues.map((issue) => (
              <IssueTableRow issue={issue} refetch={refetch} />
            ))
          }
        </TableBody>
      </Table>
    </Card>

  )
}
