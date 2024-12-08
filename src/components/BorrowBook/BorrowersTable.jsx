import React, { useState, useEffect } from "react";
import "./BorrowersTable.css";
import { supabase } from "../../lib/supabase";

const BorrowersTable = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBorrowers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("book_borrowing").select("*");
      if (error) {
        console.error("Error fetching borrowers:", error);
        setBorrowers([]);
      } else {
        setBorrowers(data);
      }
      setLoading(false);
    };

    fetchBorrowers();
  }, []);

  const calculateRemainingDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days` : "Overdue";
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="borrowers-table-container">
      <h2>Borrowers Data</h2>
      <table className="borrowers-table">
        <thead>
          <tr>
            <th>Borrower Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Book Title</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Remaining Days</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.length === 0 ? (
            <tr>
              <td colSpan="7">No records found</td>
            </tr>
          ) : (
            borrowers.map((borrower) => (
              <tr key={borrower.id}>
                <td>{borrower.borrower_name}</td>
                <td>{borrower.borrower_email}</td>
                <td>{borrower.borrower_phone}</td>
                <td>{borrower.book_title}</td>
                <td>{new Date(borrower.borrow_date).toLocaleDateString()}</td>
                <td>{new Date(borrower.due_date).toLocaleDateString()}</td>
                <td>{calculateRemainingDays(borrower.due_date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowersTable;
