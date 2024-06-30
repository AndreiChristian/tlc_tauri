export default function Spacer({ height = 5 }: { height?: number }) {
  return <div className={`h-${height}`} ></div>
}
