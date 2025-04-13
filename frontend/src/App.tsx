import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import BookDetails from "./components/BookDetails";
import Checkouts from "./components/Checkouts";
import MyCheckouts from "./components/MyCheckouts";
import AddUser from "./components/AddUser";
import AddBook from './components/AddBook';
    
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<BookSearch />} />
                <Route path="/book-details/:id" element={<BookDetails />} />
                <Route path="/checkouts" element={<Checkouts />} />
                <Route path="/my-checkouts" element={<MyCheckouts />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/add-book" element={<AddBook />} />
            </Routes>
        </Router>
    );
};

export default App;
