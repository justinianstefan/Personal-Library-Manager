import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { vi, Mock } from "vitest";
import BookFormModal from "../BookFormModal";
import { addBook, updateBook } from "../../api/bookService";
import { useBooks } from "../../hooks/useBooks";

// Mock hooks and services
vi.mock("../../hooks/useBooks");
vi.mock("../../api/bookService");

describe("BookFormModal Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (useBooks as Mock).mockReturnValue({ mutate: vi.fn() });
  });

  const mockOnClose = vi.fn();

  test("renders correctly for adding a book", () => {
    render(
      <BookFormModal
        open={true}
        initialValues={{
          id: undefined,
          title: "",
          author: "",
          genre: "",
          description: "",
        }}
        onClose={mockOnClose}
      />
    );
    const modal = screen.getByRole("dialog"); 
    const modalWithin = within(modal);

    expect(modalWithin.getByText("Add Book")).toBeInTheDocument();
    expect(modalWithin.getByLabelText("Title")).toBeInTheDocument();
    expect(modalWithin.getByLabelText("Author")).toBeInTheDocument();
  });

  test("renders correctly for editing a book", () => {
    render(
      <BookFormModal
        open={true}
        initialValues={{
          id: 1,
          title: "Book 1",
          author: "Author 1",
          genre: "Fiction",
          description: "Description 1",
        }}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Edit Book")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Book 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Author 1")).toBeInTheDocument();
  });

  test("submits form and calls addBook when adding a book", async () => {
    (addBook as Mock).mockResolvedValue({});
    render(
      <BookFormModal
        open={true}
        initialValues={{
          id: undefined,
          title: "",
          author: "",
          genre: "",
          description: "",
        }}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Book" },
    });
    fireEvent.change(screen.getByLabelText("Author"), {
      target: { value: "New Author" },
    });
    fireEvent.change(screen.getByLabelText("Genre"), {
      target: { value: "Fiction" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "A new book description" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add book/i }));

    await waitFor(() => expect(addBook).toHaveBeenCalled());
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("submits form and calls updateBook when editing a book", async () => {
    (updateBook as Mock).mockResolvedValue({});
    render(
      <BookFormModal
        open={true}
        initialValues={{
          id: 1,
          title: "Book 1",
          author: "Author 1",
          genre: "Fiction",
          description: "Description 1",
        }}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Book" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update book/i }));

    await waitFor(() => expect(updateBook).toHaveBeenCalledWith(1, expect.any(Object)));
    expect(mockOnClose).toHaveBeenCalled();
  });
});