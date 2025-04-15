import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import BookDetails from "./components/BookDetails";
import Checkouts from "./components/Checkouts";
import MyCheckouts from "./components/MyCheckouts";
import AddUser from "./components/AddUser";
import AddBook from "./components/AddBook";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/Logout" element={<Logout />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<BookSearch />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/checkouts" element={<Checkouts />} />
          <Route path="/my-checkouts" element={<MyCheckouts />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/add-book" element={<AddBook />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
