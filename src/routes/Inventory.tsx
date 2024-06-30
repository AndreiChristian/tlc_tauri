import { columns } from "@/components/inventory/InventoryColumn";
import InventoryTable from "@/components/inventory/InventoryTable";
import PageWrapper from "@/components/layout/PageWrapper";
import Title from "@/components/Title";
import { useGetFullList } from "@/pb/hooks/useGetFullList";
import { InventoryRecord } from "@/pb/types";

export default function Inventory() {

  const { records, error } = useGetFullList<InventoryRecord>("inventory")

  if (error) {
    return <div>{error.message}</div>
  }

  return <PageWrapper>
    <Title title="Inventar" />
    <InventoryTable columns={columns} data={records} />
  </PageWrapper>
}
