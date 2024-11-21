import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Tooltip,
  Fab,
  Box,
  Divider,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { useBooks } from "../hooks/useBooks";
import { deleteBook, Book } from "../api/bookService";
import BookFormModal from "./BookFormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";

const BookList: React.FC = () => {
  const { books, error, isLoading, mutate } = useBooks();
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleOpen = (book: Book | null = null) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };

  const handleDeleteConfirmation = (book: Book) => {
    setSelectedBook(book);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (selectedBook) {
      try {
        await deleteBook(selectedBook.id!);
        mutate();
      } catch (error) {
        console.error("Error deleting book:", error);
      } finally {
        setDeleteDialogOpen(false);
        setSelectedBook(null);
      }
    }
  };

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;

  return (
    <Box sx={{ position: "relative", pb: 6 }}>
      <Stack spacing={2}>
        {books?.map((book: Book, index: number) => (
          <Card
            key={book.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
              pr: 1,
              "&:hover": { boxShadow: 6 },
              transition: "box-shadow 0.3s ease-in-out",
              position: "relative",
            }}
          >
            <CardContent sx={{ paddingTop: 2}}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ flex: 1 }}>
                  <Tooltip title={expandedCard !== index ? book.title : ""}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        overflow: expandedCard === index ? "visible" : "hidden",
                        textOverflow: expandedCard === index ? "unset" : "ellipsis",
                        display: expandedCard === index ? "block" : "-webkit-box",
                        WebkitLineClamp: expandedCard === index ? "unset" : 2,
                        WebkitBoxOrient: "vertical",
                        cursor: "default",
                      }}
                    >
                      {index + 1}. {book.title}
                    </Typography>
                  </Tooltip>
                </Box>
                <Tooltip title={expandedCard === index ? "Collapse" : "Expand"}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCard(index);
                    }}
                  >
                    {expandedCard === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Tooltip>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.genre}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Tooltip title="Edit Book">
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(book);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Book">
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConfirmation(book);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </CardContent>
            <Collapse
              in={expandedCard === index}
              timeout="auto"
              unmountOnExit
              sx={{ px: 2, pb: 2 }}
            >
              <Divider sx={{ mb: 2 }}></Divider>
              <Typography variant="body2">{book.description}</Typography>
            </Collapse>
          </Card>
        ))}
      </Stack>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpen()}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
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
          onClose={handleClose}
        />
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>
          Are you sure you want to delete{" "}
          <strong>{selectedBook?.title}</strong>?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookList;