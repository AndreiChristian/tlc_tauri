import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { useCreate } from '@/pb/hooks/useCreate';
import { useToast } from '../ui/use-toast';
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Separator } from "../ui/separator";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


const formSchema = z.object({
  name: z.string(),
  familyName: z.string(),
  role: z.enum(['bucatarie', 'livrare', 'impachetare', 'altele'])
})

export default function CreateNewStaffDialog({ refetch }: { refetch: () => void }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      familyName: "",
      role: 'altele'
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    createItem(values).then(() => {
      toast({
        title: "Elementul a fost creat cu success!"
      })
      refetch()
      form.reset()
    }).catch((e) => toast({
      variant: "destructive",
      title: "A aparut o eroare",
    }))
  }

  const { toast } = useToast()
  const { createItem } = useCreate("staff")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />Adauga
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Creaza Problema noua</DialogTitle>
          <DialogDescription>
            Un titlu scurt si descriptiv si o descriere completa.
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full' >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lg font-bold">
                    Prenume
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Prenume' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lg font-bold">
                    Nume De Familie
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Nume de familie' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem >
                  <FormLabel className="font-lg font-bold">
                    Nume De Familie
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bucatarie" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Bucatarie
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="impachetare" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Impachetare
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="livrare" />
                        </FormControl>
                        <FormLabel className="font-normal">Livrare</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="altele" />
                        </FormControl>
                        <FormLabel className="font-normal">Altele</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className="my-4" />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <span className='flex-1' ></span>
              <DialogClose asChild>
                <Button type='submit'>Creaza</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
