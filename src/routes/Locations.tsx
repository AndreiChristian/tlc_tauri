import PageWrapper from "@/components/layout/PageWrapper";
import { LocationsDataTable } from "@/components/locations/LocationsTable";
import { locationsColumns } from "@/components/locations/LocationTableColumns";
import ErrorElement from "@/components/shared/ErrorElement";
import Spacer from "@/components/shared/Spacer";
import Title from "@/components/Title";
import { useGetFullList } from "@/pb/hooks/useGetFullList";
import { LocationRecord } from "@/pb/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";


export default function Locations() {

  const { records, loading, error, refetch } = useGetFullList<LocationRecord>("locations")

  if (loading) {
    return <div>Loading</div>
  }

  if (error) {
    return <PageWrapper>
      <ErrorElement error={error} />
    </PageWrapper>
  }

  return <PageWrapper>
    <Title title="Locatii" />
    <Spacer />
    <LocationsDataTable
      data={records}
      columns={locationsColumns}
      refetch={refetch}
      addElement={<AddElement />}
    />
  </PageWrapper>
}

function AddElement() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button>
          <Plus className="mr-2 w-4 h-4" />
          Adauga</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Adauga un element nou</SheetTitle>
          <Input placeholder="Hello" />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
