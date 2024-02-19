import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import '../styles/BooksPage.css';
import BooksList from '../others/BooksList';
import { useParams } from 'react-router-dom';

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const { language } = useParams();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        fetch(`/api/v1/search?language=${language}&name=${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBooks(data);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetch(`/api/v1/get?language=${language}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBooks(data);
                }
            })
            .catch((err) => console.log(err));
    }, [language]);

    return (
        <React.Fragment>
            <Header />
            <div className="booksPageDiv">
                <div className="searchHeader">
                    <div id="booksSearchDiv">
                        <span>
                            <i className="fas fa-search"></i> Search Books
                        </span>{' '}
                        <input
                            type="search"
                            autoComplete="off"
                            className="searchInput"
                            value={search}
                            name="search"
                            onChange={handleSearchChange}
                        />
                    </div>
                    <h1>{language}</h1>
                </div>
                <hr />
                <BooksList books={books} />
                <div className="footerLine">
                    We don't own any of these books.
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default BooksPage;
