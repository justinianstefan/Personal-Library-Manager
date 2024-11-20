import { renderHook } from '@testing-library/react-hooks';
import { useBooks } from '../useBooks';
import useSWR from 'swr';

vi.mock('swr');
vi.mock('../api/axiosConfig', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('useBooks', () => {
  it('should return initial state correctly', () => {
    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useBooks());

    expect(result.current.books).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.mutate).toBeInstanceOf(Function);
  });

  it('should return books when fetch is successful', () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', genre: 'Fiction', description: 'A great book.' },
      { id: 2, title: 'Book 2', author: 'Author 2', genre: 'Non-fiction', description: 'Another great book.' },
    ];

    vi.mocked(useSWR).mockReturnValue({
      data: mockBooks,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useBooks());

    expect(result.current.books).toEqual(mockBooks);
    expect(result.current.error).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle errors correctly', () => {
    const mockError = new Error('Failed to fetch');

    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: mockError,
      isLoading: false,
      isValidating: false,
      mutate: vi.fn(),
    });

    const { result } = renderHook(() => useBooks());

    expect(result.current.books).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it('should expose mutate function', () => {
    const mockMutate = vi.fn();

    vi.mocked(useSWR).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
      mutate: mockMutate,
    });

    const { result } = renderHook(() => useBooks());

    expect(result.current.mutate).toBe(mockMutate);
    expect(result.current.isLoading).toBe(true);
  });
});