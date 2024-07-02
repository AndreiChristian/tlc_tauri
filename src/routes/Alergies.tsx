import PageWrapper from "@/components/layout/PageWrapper";
import { locationsColumns } from "@/components/locations/LocationTableColumns";
import { SharedDataTable } from "@/components/shared/DataTable";
import Spacer from "@/components/shared/Spacer";
import Title from "@/components/Title";
import { useGetFullList } from "@/pb/hooks/useGetFullList";
import { LocationRecord } from "@/pb/types";

export default function Alergies() {

  const { error, loading, records, refetch } = useGetFullList<LocationRecord>("locations")

  return <PageWrapper>
    <Title title="Alergii" />
    <Spacer />
    <SharedDataTable
      columns={locationsColumns}
      data={records}
      refetch={refetch}
    />
  </PageWrapper>
}
