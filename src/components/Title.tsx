export default function Title({ title = "Dummy Title" }: { title?: string }) {
  return <h1 className="text-4xl font-bold text-foreground " >{title}</h1>
}
