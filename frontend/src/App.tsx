import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BookSearch from "./components/BookSearch";
import BookDetails from "./components/BookDetails";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Redirige la ruta raíz a /home */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<BookSearch />} />
                <Route path="/book-details/:id" element={<BookDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
