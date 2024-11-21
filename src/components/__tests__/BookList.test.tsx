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
    expect(screen.getByText((content) => content.includes("1. Book 1"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("2. Book 2"))).toBeInTheDocument();
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
    expect(screen.getByText("Loading...")).toBeInTheDocument(); // Match updated implementation
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

  test("calls deleteBook when delete button is clicked and confirmed", async () => {
    // Mock deleteBook to resolve successfully
    (deleteBook as Mock).mockResolvedValue({});
  
    // Render the component
    render(<BookList />);
  
    // Find the delete button for the first book
    const deleteButton = screen.getAllByLabelText(/delete book/i)[0];
  
    // Click the delete button
    fireEvent.click(deleteButton);
  
    // Wait for the confirmation dialog to appear
    const dialogTitle = await screen.findByText(/Are you sure you want to delete/i);
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogTitle).toHaveTextContent("Are you sure you want to delete Book 1?");
  
    // Confirm deletion by clicking the Delete button
    const confirmButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(confirmButton);
  
    // Wait for the deleteBook mock to be called with the correct ID
    await waitFor(() => {
      expect(deleteBook).toHaveBeenCalledTimes(1);
      expect(deleteBook).toHaveBeenCalledWith(1);
    });
  });

  test("opens modal when Add Book button is clicked", () => {
    render(<BookList />);
    const addButton = screen.getByLabelText(/add/i); // Ensure aria-label matches

    fireEvent.click(addButton);

    expect(screen.getByText("Add New Book")).toBeInTheDocument();
  });

  test("opens modal with book data when Edit button is clicked", () => {
    render(<BookList />);
    const editButton = screen.getAllByLabelText(/edit book/i)[0];

    fireEvent.click(editButton);

    expect(screen.getByText("Edit Book")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Book 1")).toBeInTheDocument();
  });

  test("toggles book description when expand/collapse button is clicked", async () => {
    render(<BookList />);
    const expandButton = screen.getAllByLabelText(/expand/i)[0];

    // Expand
    fireEvent.click(expandButton);
    expect(screen.getByText("Description 1")).toBeInTheDocument();

    // Collapse
    fireEvent.click(expandButton);
    await waitFor(() =>
      expect(screen.queryByText("Description 1")).not.toBeInTheDocument()
    );
  });
});