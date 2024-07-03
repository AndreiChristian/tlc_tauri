import { useGetFullList } from "@/pb/hooks/useGetFullList"
import PageWrapper from "../layout/PageWrapper"
import Title from "../Title"
import Spacer from "./Spacer"
import { SharedDataTable } from "./DataTable"
import { ColumnDef } from "@tanstack/react-table"
import LoadingElement from "./LoadingElement"
import ErrorElement from "./ErrorElement"
import { ReactNode } from "react"

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  addElement?: ReactNode
  enablePagination?: boolean
  pageSize?: number
  enableFiltering?: boolean
  columnFiltering?: string,
  enableColumnHiding?: boolean
  records: TData[],
  error: Error | null
  refetch: () => void
  loading: boolean
}

export default function SharedPage<TData, TValue>({
  columns,
  addElement,
  enablePagination = true,
  enableFiltering = true,
  pageSize = 10,
  columnFiltering = "id",
  enableColumnHiding = true,
  loading,
  error,
  records,
  refetch
}: Props<TData, TValue>) {


  if (loading) {
    return <PageWrapper>
      <LoadingElement />
    </PageWrapper>
  }

  if (error) {
    return <PageWrapper>
      <ErrorElement error={error} />
    </PageWrapper>
  }

  return <PageWrapper>
    <Title title="Alergii" />
    <Spacer />
    <SharedDataTable
      columns={columns}
      data={records}
      refetch={refetch}
      addElement={addElement}
      enablePagination={enablePagination}
      enableFiltering={enableFiltering}
      pageSize={pageSize}
      columnFiltering={columnFiltering}
      enableColumnHiding={enableColumnHiding}
    />
  </PageWrapper>
}
