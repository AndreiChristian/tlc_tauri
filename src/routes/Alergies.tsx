import { locationsColumns } from "@/components/locations/LocationsTableColumn";
import SharedPage from "@/components/shared/SharedPage";

export default function Alergies() {

  return <SharedPage collectionName="locations" columns={locationsColumns} />

}
