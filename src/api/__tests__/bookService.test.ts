import { fetchBooks, addBook, updateBook, deleteBook, Book } from '../bookService';
import axios from '../axiosConfig';
import { vi } from 'vitest';

vi.mock('../axiosConfig', () => ({
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  }));

describe('bookService API', () => {
  describe('fetchBooks', () => {
    it('should fetch all books successfully', async () => {
      const mockResponse: Book[] = [
        { id: 1, title: 'Test Book', author: 'Author', genre: 'Fiction', description: 'A test book.' },
      ];
      (axios.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchBooks();
      expect(result).toEqual(mockResponse);
      expect(axios.get).toHaveBeenCalledWith('/books');
    });

    it('should handle errors when fetching books', async () => {
      (axios.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchBooks()).rejects.toThrow('Network error');
    });
  });

  describe('addBook', () => {
    it('should add a new book successfully', async () => {
      const newBook: Book = { title: 'New Book', author: 'Author', genre: 'Non-fiction', description: 'A new book.' };
      (axios.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: newBook });

      const result = await addBook(newBook);
      expect(result).toEqual(newBook);
      expect(axios.post).toHaveBeenCalledWith('/books', newBook);
    });

    it('should handle errors when adding a new book', async () => {
      const newBook: Book = { title: 'New Book', author: 'Author', genre: 'Non-fiction', description: 'A new book.' };
      (axios.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Error adding book'));

      await expect(addBook(newBook)).rejects.toThrow('Error adding book');
    });
  });

  describe('updateBook', () => {
    it('should update a book successfully', async () => {
      const updatedBook: Book = { id: 1, title: 'Updated Title', author: 'Updated Author', genre: 'Fiction', description: 'Updated description.' };
      (axios.put as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ data: updatedBook });

      const result = await updateBook(1, updatedBook);
      expect(result).toEqual(updatedBook);
      expect(axios.put).toHaveBeenCalledWith('/books/1', updatedBook);
    });

    it('should handle errors when updating a book', async () => {
      const updatedBook: Book = { id: 1, title: 'Updated Title', author: 'Updated Author', genre: 'Fiction', description: 'Updated description.' };
      (axios.put as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Error updating book'));

      await expect(updateBook(1, updatedBook)).rejects.toThrow('Error updating book');
    });
  });

  describe('deleteBook', () => {
    it('should delete a book successfully', async () => {
      (axios.delete as ReturnType<typeof vi.fn>).mockResolvedValueOnce({});

      await deleteBook(1);
      expect(axios.delete).toHaveBeenCalledWith('/books/1');
    });

    it('should handle errors when deleting a book', async () => {
      (axios.delete as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Error deleting book'));

      await expect(deleteBook(1)).rejects.toThrow('Error deleting book');
    });
  });
});