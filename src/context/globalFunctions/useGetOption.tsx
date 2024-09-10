import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseGetOptions<T> {
  url: string;
}

interface UseGetResponse<T> {
  loading: boolean;
  error: any;
  data: T | null;
}

export function useGet<T>(url: string): UseGetResponse<T> {
  const { data, error, isLoading } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const result = await axios.get(url);
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
