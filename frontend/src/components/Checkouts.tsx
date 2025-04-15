import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Checkouts.css";

interface Checkout {
  _id: string;
  bookId: {
    title: string;
  };
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

const Checkouts: React.FC = () => {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await axios.get(`${API_URL}/my-u-library/checkouts/active`);
        setCheckouts(response.data.activeCheckouts);
        setLoading(false);
      } catch (error) {
        setError("Error fetching checkouts");
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, [API_URL]);

  const markBookAsReturned = async (checkoutId: string) => {
    try {
      await axios.put(`${API_URL}/my-u-library/checkouts/${checkoutId}/return`);
      alert("Book marked as returned!");
      const updatedCheckouts = checkouts.filter((checkout) => checkout._id !== checkoutId);
      setCheckouts(updatedCheckouts);
    } catch (error) {
      console.error("Error marking book as returned:", error);
      alert("Failed to mark book as returned.");
    }
  };

  if (loading) {
    return <p>Loading checkouts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="chk-details">
      <h2>Active Checkouts</h2>
      <div className="chk-div-table">
        <table className="chk-table">
          <thead>
            <tr>
              <th>Checkout ID</th>
              <th>Book Title</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Checkout Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((checkout) => (
              <tr key={checkout._id}>
                <td>{checkout._id}</td>
                <td>{checkout.bookId.title}</td>
                <td>{checkout.userId.firstName} {checkout.userId.lastName}</td>
                <td>{checkout.userId.email}</td>
                <td>{new Date(checkout.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="chk-button"
                    onClick={() => markBookAsReturned(checkout._id)}
                  >
                    Mark book as returned
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Checkouts;
