import axios from './axiosConfig';

// Type definition for a Book
export interface Book {
  id?: number; // Optional for creating a new book
  title: string;
  author: string;
  genre: string;
  description: string;
}

// Fetch all books
export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get('/books');
  return response.data;
};

// Add a new book
export const addBook = async (book: Book): Promise<Book> => {
  const response = await axios.post('/books', book);
  return response.data;
};

// Update a book
export const updateBook = async (id: number, book: Book): Promise<Book> => {
  const response = await axios.put(`/books/${id}`, book);
  return response.data;
};

// Delete a book
export const deleteBook = async (id: number): Promise<void> => {
  await axios.delete(`/books/${id}`);
};