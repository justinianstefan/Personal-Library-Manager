import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, Mock } from "vitest";
import BookList from "../BookList";
import { useBooks } from "../../hooks/useBooks";
import { deleteBook } from "../../api/bookService";

// Mock hooks and services
vi.mock("../../hooks/useBooks");
vi.mock("../../api/bookService");

const mockBooks = [
  { id: 1, title: "Book 1", author: "Author 1", genre: "Fiction", description: "Description 1" },
  { id: 2, title: "Book 2", author: "Author 2", genre: "Non-Fiction", description: "Description 2" },
];

describe("BookList Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useBooks as Mock).mockReturnValue({
      books: mockBooks,
      error: null,
      isLoading: false,
      mutate: vi.fn(),
    });
  });

  test("renders a list of books", () => {
    render(<BookList />);
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();
    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByText("Non-Fiction")).toBeInTheDocument();
  });

  test("shows loading spinner when data is loading", () => {
    (useBooks as Mock).mockReturnValue({
      books: null,
      error: null,
      isLoading: true,
      mutate: vi.fn(),
    });
    render(<BookList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("shows error message if fetching books fails", () => {
    (useBooks as Mock).mockReturnValue({
      books: null,
      error: new Error("Failed to fetch"),
      isLoading: false,
      mutate: vi.fn(),
    });
    render(<BookList />);
    expect(screen.getByText("Error fetching books")).toBeInTheDocument();
  });

  test("calls handleDelete when delete button is clicked", async () => {
    (deleteBook as Mock).mockResolvedValue({});
    render(<BookList />);
    const deleteButton = screen.getAllByRole("button", { name: /delete book/i })[0];

    fireEvent.click(deleteButton);

    await waitFor(() => expect(deleteBook).toHaveBeenCalledWith(1));
  });

  test("opens modal when Add Book button is clicked", () => {
    render(<BookList />);
    const addButton = screen.getByRole("button", { name: /add book/i });

    fireEvent.click(addButton);

    expect(screen.getByTestId("add-book-button")).toBeInTheDocument();
  });

  test("opens modal with book data when Edit button is clicked", () => {
    render(<BookList />);
    const editButton = screen.getAllByRole("button", { name: /edit book/i })[0];

    fireEvent.click(editButton);

    expect(screen.getByText("Edit Book")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Book 1")).toBeInTheDocument();
  });
});