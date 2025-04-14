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
  };
  createdAt: string;
}

const MyCheckouts: React.FC = () => {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const email = sessionStorage.getItem("email");
        if (!email) {
          setError("The user's email was not found in the session.");
          setLoading(false);
          return;
        }

        const userIdResponse = await axios.get(
          `http://localhost:3010/my-u-library/users/email/${email}`
        );

        const userId = userIdResponse.data.id;
        if (!userId) {
          setError("The userId was not found for the provided email.");
          setLoading(false);
          return;
        }

        const checkoutsResponse = await axios.get(
          `http://localhost:3010/my-u-library/checkouts/user/${userId}`
        );

        setCheckouts(checkoutsResponse.data.userCheckouts || []);
        setLoading(false);
      } catch (error: any) {
        setError("Failed to retrieve user checkouts");
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, []);

  if (loading) {
    return <p>Loading checkouts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!checkouts.length) {
    return <p>No checkouts found for the user.</p>;
  }

  return (
    <div className="chk-details">
      <h2>My Checkouts</h2>
      <div className="chk-div-table">
        <table className="chk-table">
          <thead>
            <tr>
              <th>Checkout ID</th>
              <th>Book Title</th>
              <th>Name</th>
              <th>Checkout Date</th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((checkout) => (
              <tr key={checkout._id}>
                <td>{checkout._id}</td>
                <td>{checkout.bookId.title}</td>
                <td>
                  {checkout.userId.firstName} {checkout.userId.lastName}
                </td>
                <td>{new Date(checkout.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCheckouts;
