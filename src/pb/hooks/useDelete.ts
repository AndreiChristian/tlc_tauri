import { useState } from "react";
import { pb } from "../main"

export function useDelete(recordId: string, collectionName: string) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | unknown>(null)

  const deleteItem = async () => {
    setLoading(true)
    setError(null)
    try {
      await pb.collection(collectionName).delete(recordId)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  return { deleteItem, loading, error }
}
