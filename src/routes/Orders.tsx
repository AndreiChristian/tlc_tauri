import PageWrapper from "@/components/layout/PageWrapper";
import { columns, OrderRecord } from "@/components/orders/OrdersColumns";
import { DataTable } from "@/components/orders/OrdersTable";
import ErrorElement from "@/components/shared/ErrorElement";
import Spacer from "@/components/shared/Spacer";
import Title from "@/components/Title";
import { useGetFullList } from "@/pb/hooks/useGetFullList";

export default function Orders() {

  const { records, loading, error } = useGetFullList<OrderRecord>("orders")

  if (loading) {
    return <div>LOading</div>
  }

  if (error) {
    return <ErrorElement message={error.message} />
  }

  return (
    <PageWrapper>
      <Title title="Comenzi" />
      <Spacer />
      <DataTable data={records} columns={columns} />
    </PageWrapper>
  )
}
