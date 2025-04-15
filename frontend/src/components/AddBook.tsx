import React, { useState } from "react";
import axios from "axios";
import "../styles/AddBook.css";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishedYear, setPublishedYear] = useState<number | "">("");
  const [genre, setGenre] = useState<string>("");
  const [stock, setStock] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(`${API_URL}/my-u-library/books`, {
        title,
        author,
        publishedYear: Number(publishedYear),
        genre,
        stock,
      });
      setMessage("Book added successfully!");
      setTitle("");
      setAuthor("");
      setPublishedYear("");
      setGenre("");
      setStock(5);
    } catch {
      setMessage("Error adding book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishedYear">Published Year</label>
          <input
            type="number"
            id="publishedYear"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value ? Number(e.target.value) : "")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <button type="submit" className="add-book-button" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
      {message && (
        <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddBook;
