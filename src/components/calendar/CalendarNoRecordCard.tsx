import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getFormattedDay } from "@/utils/getFormattedDay"
import { Label } from "../ui/label"
import { Dispatch, SetStateAction, useState } from "react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useCreate } from "@/pb/hooks/useCreate"
import { useToast } from "../ui/use-toast"
import { RecordModel } from "pocketbase"


export default function({ date, setRecord }: { date: Date, setRecord: Dispatch<SetStateAction<RecordModel | null | undefined>> }) {

  const formatedDate = getFormattedDay(date)
  const [description, setDescription] = useState("")

  const { toast } = useToast()

  const { createItem } = useCreate("calendar")

  function handleCreate() {
    const data = {
      date: formatedDate,
      description: description
    }
    createItem(data).then((record) => {
      setRecord(record)
      toast({ title: "Element create cu success", }
      )
    }).catch((error) => toast({
      title: "A aparut o eroare",
      variant: "destructive"
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatedDate}</CardTitle>
        <CardDescription>Nu exista mentiuni speciale pentru aceasta zi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Decriere</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descriere pentru ziua selectata" ></Textarea>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <span className="flex-1" ></span>
        <Button
          onClick={handleCreate}
          disabled={!description} >Creaza</Button>
      </CardFooter>
    </Card>
  )
}
