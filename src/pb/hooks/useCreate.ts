import { useState } from "react";
import { pb } from "../main"

export function useCreate<T>(collectionName: string) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | unknown>(null)

  const createItem = async (data: T) => {
    setLoading(true)
    setError(null)
    try {
      const result = await pb.collection(collectionName).create(data as FormData)
      setLoading(false)
      return result
    } catch (error) {
      setLoading(false)
      setError(error)
      throw error
    }
  }

  return { createItem, loading, error }
}
