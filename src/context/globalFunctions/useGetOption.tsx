import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseGetResponse<T> {
  loading: boolean;
  error: any;
  data: T | null;
}

export function useGet<T>(url: string, config?: any): UseGetResponse<T> {
  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const result = await axios.get(url, config ? config : {});
      if (result.data.error) {
        throw new Error(result.data.error);
      }
      return result.data.data;
    },
  });

  return {
    loading: isLoading,
    error,
    data,
  };
}
