import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import BooksPage from './pages/BooksPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:language" element={<BooksPage />} />
                <Route element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
