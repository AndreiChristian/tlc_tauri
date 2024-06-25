import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { pb } from "@/pb/main"
import { useNavigate, useNavigation } from "react-router-dom"

export default function Auth() {

  const navigation = useNavigate()

  return (
    <section className="dark bg-background h-screen w-full flex items-center justify-center" >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => {
            pb.collection("users").authWithPassword("a@gmail.com", "andreicod9A").then(() => {
              console.log("Success")
              navigation("/")
            }).catch(e => console.error(e))
          }} className="w-full">Sign in</Button>
        </CardFooter>
      </Card>
    </section>
  )
}

