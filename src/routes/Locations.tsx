import LocationsAddElement from "@/components/locations/LocationsAddElement";
import { locationsColumns } from "@/components/locations/LocationsTableColumn";
import SharedPage from "@/components/shared/SharedPage";
import { useGetFullList } from "@/pb/hooks/useGetFullList";
import { LocationRecord } from "@/pb/types";

export default function Locations() {

  const { records, loading, error, refetch } = useGetFullList<LocationRecord>("locations")

  return <SharedPage
    records={records}
    loading={loading}
    error={error}
    refetch={refetch}
    columns={locationsColumns}
    addElement={<LocationsAddElement refetch={refetch} />} />
}
