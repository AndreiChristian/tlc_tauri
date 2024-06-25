import PageWrapper from "@/components/layout/PageWrapper";
import Title from "@/components/Title";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pb } from "@/pb/main";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";

export default function Locations() {

  const [records, setRecords] = useState<RecordModel[]>([])

  async function fetchData() {
    try {
      const data = await pb.collection('food').getFullList({
        sort: '-created',
      });
      setRecords(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <PageWrapper>
    <Title title="Locatii" />
    <div className="h-10" ></div>
    <Card>
      <Table >
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Numar</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Numar Portii</TableHead>
            <TableHead className="text-right">Ora de plecare</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((r, index) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>550</TableCell>
              <TableCell className="text-right">9:00</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  </PageWrapper>
}
