import { useState, useEffect, useCallback } from 'react';
import { pb } from '../main'; // Adjust this import path as needed
import { RecordModel } from 'pocketbase';

export function useGetFullList<T>(collectionName: string) {
  const [records, setRecords] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedRecords = await pb.collection(collectionName).getFullList<T>({
        sort: "-created"
      });
      setRecords(fetchedRecords);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const refetch = useCallback(() => {
    fetchRecords();
  }, [fetchRecords]);

  return { records, loading, error, refetch };
}
