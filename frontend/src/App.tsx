import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookSearch from './components/BookSearch';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Redirect the root route to /home */}
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<BookSearch />} />
            </Routes>
        </Router>
    );
};

export default App;