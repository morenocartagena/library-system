import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/BookSearch.css";
import mainLogo from "../images/main.png";

const BookSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate()

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSearch = async () => {
    try {
      let searchUrl = `${API_URL}/my-u-library/books?search=${query}`;
      if (filter === 'author') {
        searchUrl = `${API_URL}/my-u-library/books?author=${query}`;
      } else if (filter === 'genre') {
        searchUrl = `${API_URL}/my-u-library/books?genre=${query}`;
      }
      const response = await axios.get(searchUrl);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDetails = (id: string) => {
    navigate(`/book-details/${id}`); 
  };

  const searchLabel =
    filter === "author"
      ? "Search a book by author:"
      : filter === "genre"
      ? "Search a book by genre:"
      : "Search a book:";

   const searchPlaceholder =
    filter === 'author'
      ? 'Enter author name'
      : filter === 'genre'
      ? 'Enter genre'
      : 'Enter book title';

  return (
    <>
        <div className="bse-centered-div">
        <img className="bse-logo" src={mainLogo} alt="My U Library" />
        <br></br>
        <label htmlFor="book-search">{searchLabel}</label>
        <div className="bse-search-bar">
            <input
                type="text"
                id="book-search"
                name="bookSearch"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
            />
            <button className="bse-search-button" onClick={handleSearch}>Search</button>
        </div>
        <div>
            <label htmlFor="filter">Filter: </label>
            <select
            id="filter"
            name="filter"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            >
            <option value="">By title</option>
            <option value="author">By author</option>
            <option value="genre">By genre</option>
            </select>
        </div>
        <br></br>

        {books.map((book: { _id: string; title: string; author: string }) => (
            <div className="bse-details" key={book._id}>
                <div className="bse-details-row">
                    <span className="bse-details-span">
                        {book.title} by {book.author}
                    </span>
                    <button 
                      className="bse-details-button" 
                      onClick={() => handleDetails(book._id)}>See details
                    </button>
                </div>
            </div>
        ))}

        </div>
    </>
  );
};

export default BookSearch;
