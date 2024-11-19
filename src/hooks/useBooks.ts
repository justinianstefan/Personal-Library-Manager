import useSWR from 'swr';
import axios from '../api/axiosConfig';
import { Book } from '../api/bookService';

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// Custom hook for managing books
export const useBooks = () => {
  const { data, error, mutate, isLoading } = useSWR<Book[]>('/books', fetcher);

  return {
    books: data,
    error,
    isLoading,
    mutate, // Expose mutate to handle revalidation
  };
};