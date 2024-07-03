import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { useCreate } from "@/pb/hooks/useCreate"
import { Location } from "@/pb/types"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Numele nu poate fi gol"
  }),
  portions: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "Numarul de portii trebuie sa fie un numar pozitiv"
  })
})

export default function LocationsAddElement({ refetch }: { refetch: () => void }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      portions: ""
    }
  })

  const { toast } = useToast()
  const { createItem, error, loading } = useCreate<Location>("locations")

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submittedValues = {
      ...values,
      portions: parseInt(values.portions)
    };
    createItem(submittedValues).then(() => refetch())
    if (loading) {
      toast({
        title: "wait "
      })
    }
    if (error) {
      toast({
        variant: 'destructive',
        title: "Something went wrong"
      })
    }
    form.reset()
  }

  return (
    <Sheet>
      <SheetTrigger asChild >
        <Button>
          <Plus className="mr-2 w-4 h-4" />
          Adauga
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adauga un element nou</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="text-foreground" >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume</FormLabel>
                    <FormControl >
                      <Input  {...field} />
                    </FormControl>
                    <FormDescription>
                      Denumirea comunei
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="portions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground" >Numar de portii</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Numarul de porii de trebuie livrat zi de zi.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Creaza</Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
