import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addBook, updateBook, Book } from "../api/bookService";
import { useBooks } from "../hooks/useBooks";

interface BookModalProps {
  open: boolean;
  initialValues: Book;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({
  open,
  initialValues,
  onClose,
}) => {
  const { mutate } = useBooks(); // SWR mutate for revalidating data

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      genre: Yup.string().required("Genre is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values.id) {
          await updateBook(values.id, values); // Update existing book
        } else {
          await addBook(values); // Add a new book
        }
        mutate(); // Revalidate books data
        onClose(); // Close the modal
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialValues.id ? "Edit Book" : "Add New Book"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Author"
            name="author"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Genre"
            name="genre"
            value={formik.values.genre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
          />
          {/* Updated TextField for Description */}
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            multiline
            maxRows={5} // Limits the height to 4-5 lines
            sx={{
              overflow: "auto", // Adds scrollbar for overflow
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          onClick={formik.handleSubmit as any} // Ensures formik's submit function triggers
          variant="contained"
          color="primary"
        >
          {initialValues.id ? "Update Book" : "Add Book"}
        </Button>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;