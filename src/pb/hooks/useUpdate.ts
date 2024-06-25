import { useState } from "react";
import { pb } from "../main"

export function useUpdate<T>(recordId: string, collectionName: string) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | unknown>(null)

  const updateItem = async (data: T) => {
    setLoading(true)
    setError(null)
    try {
      const result = await pb.collection(collectionName).update(recordId, data as FormData)
      setLoading(false)
      return result
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  return { updateItem, loading, error }
}
