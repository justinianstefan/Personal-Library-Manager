import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Stack,
} from "@mui/material";
import BookList from "./components/BookList";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Library Manager
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ flex: 1, py: 4 }}>
        <Stack spacing={4}>
          {/* Book List Section */}
          <Box>
            <BookList />
          </Box>
        </Stack>
      </Container>

      {/* Sticky Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "primary.dark",
          color: "white",
          mt: "auto", // Push footer to the bottom
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Personal Library Manager
        </Typography>
      </Box>
    </Box>
  );
};

export default App;