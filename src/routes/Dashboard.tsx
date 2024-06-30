import PageWrapper from "@/components/layout/PageWrapper";
import Title from "@/components/Title";
import { pb } from "@/pb/main";
import { getFormattedDay } from "@/utils/getFormattedDay";
import { RecordModel } from "pocketbase";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [record, setRecord] = useState<RecordModel | null>()

  async function fetchDate(date: Date) {
    let record: RecordModel | null = null
    try {
      const formattedDate = getFormattedDay(date)
      record = await pb.collection('calendar').getFirstListItem(`date = '${formattedDate}'`);
    } catch (_) {
    }
    return record
  }

  useEffect(() => {
    fetchDate(new Date()).then((r) => setRecord(r))
  }, [])


  return (
    <PageWrapper>
      <Title title="Dashboard" />
      <h1>{record?.date || "Error"}</h1>
      <p>{record?.description}</p>
    </PageWrapper>
  )
}
