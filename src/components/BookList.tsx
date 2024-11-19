import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useBooks } from "../hooks/useBooks";
import { deleteBook, Book } from "../api/bookService";
import BookFormModal from "./BookFormModal"; // The merged modal component
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookList: React.FC = () => {
  const { books, error, isLoading, mutate } = useBooks(); // Fetch books with SWR
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Handle opening the modal (for add or edit)
  const handleOpen = (book: Book | null = null) => {
    setSelectedBook(book);
    setOpen(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  // Handle book deletion
  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      mutate(); // Revalidate data after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error fetching books</p>;

  return (
    <>
      {/* Add Book Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        data-testid="add-book-button"
        onClick={() => handleOpen()} // Open modal with empty form
        sx={{
          fontWeight: "bold",
          mb: 2,
          alignSelf: "flex-start",
        }}
      >
        Add Book
      </Button>

      {/* Book List Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((book: Book) => (
            <TableRow
              key={book.id}
              sx={{
                "&:nth-of-type(odd)": {
                  backgroundColor: "#f9f9f9",
                },
                "&:hover": {
                  backgroundColor: "#eef",
                },
              }}
            >
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell
                sx={{
                  minWidth: "120px",
                }}
              >
                {/* Edit Button */}
                <Tooltip title="Edit Book" arrow>
                  <IconButton color="primary" onClick={() => handleOpen(book)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {/* Delete Button */}
                <Tooltip title="Delete Book" arrow>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(book.id!)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Book Form Modal */}
      {open && (
        <BookFormModal
          open={open}
          initialValues={
            selectedBook || {
              title: "",
              author: "",
              genre: "",
              description: "",
            }
          }
          onClose={handleClose} // Close modal on form submission or cancellation
        />
      )}
    </>
  );
};

export default BookList;