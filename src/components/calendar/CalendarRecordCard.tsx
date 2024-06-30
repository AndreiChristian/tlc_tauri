import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecordModel } from "pocketbase"
import { Button } from "../ui/button"
import { Dispatch, SetStateAction, useState } from "react"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useUpdate } from "@/pb/hooks/useUpdate"
import { useToast } from "../ui/use-toast"


export default function CalendarRecordCard({ record, setRecord }: { record: RecordModel, setRecord: Dispatch<SetStateAction<RecordModel | null | undefined>> }) {

  const { updateItem } = useUpdate(record.id, "calendar")
  const { toast } = useToast()

  const [description, setDescription] = useState<string>(record.description)
  const [isEditing, setIsEditing] = useState(false)

  function handleEdit() {
    const data = {
      description: description
    }
    updateItem(data).then((record) => {
      setRecord(record)
      setIsEditing(false)
      toast({ title: "Element create cu success", }
      )
    }).catch(() => {
      setIsEditing(false)
      toast({
        title: "A aparut o eroare",
        variant: "destructive"
      })
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{record.date}</CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ?
          <p>{record.description}</p>
          :
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Decriere</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descriere pentru ziua selectata" ></Textarea>
          </div>
        }
      </CardContent>
      <CardFooter>
        {!isEditing && <span className="flex-1"></span>}
        {!isEditing && <Button onClick={() => setIsEditing(true)} >Editeaza</Button>}
        {isEditing && <>
          <Button onClick={() => setIsEditing(false)} variant='secondary'>Anuleaza</Button>
          <span className="flex-1"></span>
          <Button onClick={handleEdit} >Confirma</Button>
        </>}
      </CardFooter>
    </Card>

  )
}
