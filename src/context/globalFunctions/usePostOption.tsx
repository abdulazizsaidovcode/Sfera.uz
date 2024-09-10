import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toastMessage } from '../api/toastMessage';

interface UsePostResponse<T> {
  loading: boolean;
  error: any;
  response: T | null;
  postData: () => void;
}

export function usePost<T>(url: string, data: T): UsePostResponse<T> {
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axios.post(url, data);
      if (result.data.error) {
        toastMessage(result.data.error)
        throw new Error(result.data.error);
      }
      return result.data.data;
    },
    onError: (error: any) => {
      // Custom error handling if needed
    },
  });

  return {
    loading: mutation.status === 'pending', // status 'pending' indicates loading
    error: mutation.error,
    response: mutation.data,
    postData: mutation.mutateAsync,
  };
}
