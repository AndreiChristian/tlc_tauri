import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

export default function LoadingElement() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Loading</AlertTitle>
    </Alert>
  )
}


