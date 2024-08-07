import PageWrapper from "@/components/layout/PageWrapper"
import CreateNewStaffDialog from "@/components/staff/CreateNewStaffDialog"
import StaffCard from "@/components/staff/StaffCard"
import StaffTable from "@/components/staff/StaffTable"
import Title from "@/components/Title"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGetFullList } from "@/pb/hooks/useGetFullList"
import { Staff as StaffInterface } from "@/pb/types"
import { Redo2 } from "lucide-react"
import { useState } from "react"
import { AlertCircle } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { pb } from "@/pb/main"


export default function Staff() {

  const { records, loading, error, refetch } = useGetFullList<StaffInterface>("staff")

  const [searchValue, setSearchValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    console.log(error)
    return (
      <PageWrapper>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Eroare: {error.name}</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
      </PageWrapper>
    )
  }

  const staffTotalNumber = records.length
  const kitchenNumber = records.filter(r => r.role === "bucatarie").length
  const deliveryNumber = records.filter(r => r.role === "livrare").length
  const packagingNumber = records.filter(r => r.role === "impachetare").length
  const othersNumber = records.filter(r => r.role === "altele").length

  return (
    <PageWrapper>
      <Title title="Personal" />
      <div className="h-5" />
      <div className="flex items-center justify-start w-full gap-5" >
        <StaffCard title="Total" staffTotalNumber={staffTotalNumber} staffNumber={staffTotalNumber} />
        <StaffCard title="Bucatarie" staffTotalNumber={staffTotalNumber} staffNumber={kitchenNumber} />
        <StaffCard title="Livrare" staffTotalNumber={staffTotalNumber} staffNumber={deliveryNumber} />
        <StaffCard title="Impachetare" staffTotalNumber={staffTotalNumber} staffNumber={packagingNumber} />
        <StaffCard title="Altele" staffTotalNumber={staffTotalNumber} staffNumber={othersNumber} />
      </div>
      <div className="h-5" />
      <div className="flex items-center justify-center gap-5" >
        <Input className="max-w-[400px] text-foreground " value={searchValue} onChange={handleChange} placeholder="Cauta dupa numele" />
        <span className="flex-1" ></span>
        <CreateNewStaffDialog refetch={refetch} />
        <Button onClick={refetch} >
          <Redo2 className="mr-2 h-4 w-4" />
          Reincarca</Button>
      </div>
      <div className="h-5" ></div>
      <StaffTable refetch={refetch} records={records.filter(r => !searchValue || r.familyName.toUpperCase().includes(searchValue.toUpperCase()) || r.name.toUpperCase().includes(searchValue.toUpperCase()))} />
    </PageWrapper>
  )
}
