# Personal Library Manager

A web-based application to manage your personal library, built using **React**, **TypeScript**, and **Vite**. This project demonstrates a clean architecture with SWR for data fetching, Material-UI for styling, and integration with a backend API for full CRUD functionality.

## Features
- Manage a collection of books with full CRUD functionality (Add, Edit, Delete).
- SWR-based data fetching with efficient caching and revalidation.
- Responsive design using Material-UI.
- Form validation with Formik and Yup.
- Unit and integration tests using Vitest.

---

## Getting Started

### Prerequisites
- Node.js (>=16.0.0)
- npm (>=8.0.0)

### Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/JustinianStefan/Personal-Library-Manager.git
cd Personal-Library-Manager
npm install
```

The application will be available at `http://localhost:3000`.

### 📂 Project Structure

```
src/
├── api/               # API configurations and services
├── components/        # React components (UI)
├── hooks/             # Custom hooks (e.g., useBooks)
├── __tests__/         # Unit and integration tests
└── App.tsx            # Main application file
```

- **`api/`**: Handles API communication using Axios.
- **`components/`**: Contains reusable components like `BookFormModal` and `BookList`.
- **`hooks/`**: Includes custom hooks like `useBooks`, built with SWR for data fetching.

### Deployment

The application is deployed using **GitHub Pages**. You can access it here:  
[Personal Library Manager](https://justinianstefan.github.io/Personal-Library-Manager/)

### Technologies Used

- **React 18**: Frontend library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **TypeScript**: Type-safe JavaScript.
- **Material-UI**: Modern, responsive UI components.
- **SWR**: React hooks for remote data fetching.
- **Formik & Yup**: Form handling and validation.
- **Vitest**: Fast unit and integration testing.
- **Axios**: HTTP client for API calls.

---

## 🧪 Running Tests

1. Run all tests:
   ```bash
   npm run test
   ```

### Code Coverage Report
The application is rigorously tested, with code coverage as follows:
- API: **100%**
- Components: **94%-97%**
- Custom Hooks: **100%**

---

## 🌐 API Endpoints
The application interacts with a backend API to perform CRUD operations on books. Below are the key endpoints:

| Method | Endpoint    | Description              |
|--------|-------------|--------------------------|
| GET    | `/books`    | Fetch all books          |
| POST   | `/books`    | Add a new book           |
| PUT    | `/books/:id`| Update an existing book  |
| DELETE | `/books/:id`| Delete a book            |

The back-end was extracted to a separate repo https://github.com/justinianstefan/Personal-Library-Manager-service and deployed using Render.
---

## 📝 License
This project is licensed under the **MIT License**.

Feel free to explore and make this project even better! 🚀