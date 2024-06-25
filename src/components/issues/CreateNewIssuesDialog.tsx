import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
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
import { Switch } from '../ui/switch';
import { Separator } from "../ui/separator";
import { Plus } from "lucide-react";


const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  urgent: z.boolean().default(false)
})

export default function CreateNewItemDialog({ refetch }: { refetch: () => void }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      urgent: false
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
  const { createItem } = useCreate("issues")

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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lg font-bold">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Title' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lg font-bold">
                    Descriere
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder='titlu' {...field} ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="urgent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-lg font-bold"  >
                    Urgent
                  </FormLabel>
                  <br />
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
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
