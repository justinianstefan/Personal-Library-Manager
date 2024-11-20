# Personal Library Manager

## 📚 Description
**Personal Library Manager** is a web application that helps users manage their personal book collections. You can add, edit, and delete books, as well as view your entire library.

---

## 🛠️ Technologies Used
- **Frontend**: React, TypeScript
- **State Management**: SWR for data fetching and caching
- **API Communication**: Axios
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite
- **Hosting**: Render for deployment

---

## 🚀 How to Run the Application?

### 1. Installation
Make sure you have **Node.js** and **npm** (or **yarn**) installed.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd personal-library-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 2. Running Locally
Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 3. Building for Production
To create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

---

## 🧪 Running Tests

1. Run all tests:
   ```bash
   npm run test
   ```

2. Run tests with coverage:
   ```bash
   npm run test -- --coverage
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

---

## 📂 Project Structure

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

---

## 📝 License
This project is licensed under the **MIT License**.

Feel free to explore and make this project even better! 🚀