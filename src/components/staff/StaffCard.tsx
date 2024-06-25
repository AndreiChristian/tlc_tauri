import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "../ui/progress"

interface Props {
  staffNumber: number,
  staffTotalNumber: number,
  title: string
}

export default function StaffCard({ staffNumber, staffTotalNumber, title }: Props) {
  return (
    <Card className="w-[300px]" >
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{staffNumber}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Progress value={staffNumber / staffTotalNumber * 100} />
      </CardFooter>
    </Card>

  )
}
