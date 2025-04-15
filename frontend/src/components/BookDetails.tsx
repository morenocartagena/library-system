import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "../styles/BookDetails.css";
import books1 from "../images/books1.png";

interface CustomJwtPayload {
  email: string;
  role: string;
}

const BookDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<{ 
    title: string; 
    author: string;
    publishedYear: number;
    genre: string;
    stock: number 
  } | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/my-u-library/books/${id}`);
        setBook(response.data.book);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id, API_URL]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      setEmail(decodedToken.email);
      setRole(decodedToken.role); // Extraer el rol del usuario
    }
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!email) return;

      try {
        const response = await axios.get(`${API_URL}/my-u-library/users/email/${email}`);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [email, API_URL]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  const handleButtonClick = async () => {
    if (role === "librarian") {
      navigate("/home");
      return;
    }

    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    if (book.stock === 0) {
      navigate("/home");
    } else {
      try {
        await axios.post(`${API_URL}/my-u-library/checkouts`, {
          bookId: id,
          userId: userId,
        });
        navigate("/my-checkouts");
      } catch (error) {
        console.error("Error creating checkout record:", error);
      }
    }
  };

  return (
    <>
      <h2>Book Details</h2>
      <div className="bde-details">
        <div className="bde-div-img">
          <img className="bde-img" src={books1} alt="Books" />
        </div>
        <div className="bde-div-table">
          <table className="bde-table">
            <tbody>
              <tr><td className="bde-td">Title:</td><td>{book.title}</td></tr>
              <tr><td className="bde-td">Author:</td><td>{book.author}</td></tr>
              <tr><td className="bde-td">Published Year:</td><td>{book.publishedYear}</td></tr>
              <tr><td className="bde-td">Genre:</td><td>{book.genre}</td></tr>
              <tr><td className="bde-td">Stock:</td><td>{book.stock}</td></tr>
              <tr>
                <td colSpan={2}>
                  <button
                    className="bde-button"
                    onClick={handleButtonClick}
                  >
                    {role === "librarian" ? "Return Home" : book.stock === 0 ? "Not available. Return Home" : "Checkout this book"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
