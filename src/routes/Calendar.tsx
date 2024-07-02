import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import PageWrapper from "@/components/layout/PageWrapper";
import Title from "@/components/Title";
import { Calendar } from "@/components/ui/calendar";
import { pb } from "@/pb/main";
import { setDefaultOptions } from "date-fns";
import { RecordModel } from "pocketbase";
import { useState } from "react";
import { DateBefore } from "react-day-picker";
import { ro } from "date-fns/locale";
import { getFormattedDay } from "@/utils/getFormattedDay";
import CalendarNoRecordCard from "@/components/calendar/CalendarNoRecordCard";
import CalendarRecordCard from "@/components/calendar/CalendarRecordCard";

setDefaultOptions({ locale: ro })

export default function CalendarRoute() {

  const [record, setRecord] = useState<RecordModel | null>()
  const [date, setDate] = useState<Date | undefined>(new Date())

  async function fetchDate(date: Date) {
    let record: RecordModel | null = null
    try {
      const formattedDate = getFormattedDay(date)
      record = await pb.collection('calendar').getFirstListItem(`date = '${formattedDate}'`);
    } catch (_) {
    }
    return record
  }

  async function handleSelectDate(date: Date | undefined) {
    setDate(date)
    setRecord(null)
    try {
      if (date) {
        const record = await fetchDate(date)
        if (record) {
          setRecord(record)
        }
      } else {
        throw new Error("Ziua nu a putut fi selectata")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const formattedDate = date
    ? getFormattedDay(date)
    : "Nu este aleasa nicio zi";

  const beforeMatcher: DateBefore = { before: new Date() };

  return (
    <PageWrapper>
      <Title title="Calendar" />
      <div className="h-5" />
      <Calendar
        locale={ro}
        showOutsideDays={false}
        disabled={beforeMatcher}
        numberOfMonths={12}
        mode="single"
        selected={date}
        onSelect={(date) => handleSelectDate(date)}
        className="rounded-md border"
        classNames={{
          months: "grid grid-cols-4 gap-10",
          month: "sm:w-auto border rounded-md mx-auto p-2",
        }}
      />
      <div className="h-5" />
      {record ?
        <CalendarRecordCard record={record} setRecord={setRecord} />
        : date ?
          <CalendarNoRecordCard date={date} setRecord={setRecord} />
          :
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
          </Alert>
      }
      <div className="h-5" />
    </PageWrapper>
  )
}
