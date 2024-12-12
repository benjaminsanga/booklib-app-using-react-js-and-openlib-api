import React, { useState, useEffect } from "react";
import "./BorrowersTable.css";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

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

  const handleReturnedBook = async (id) => {
    try {
      const { error } = await supabase
        .from("book_borrowing")
        .update({ status: "Returned" })
        .eq("id", id);

      if (error) {
        console.error("Error updating book status:", error);
        toast.error("Failed to mark as returned.");
      } else {
        toast.success("Book marked as returned successfully.");
        setBorrowers((prev) =>
          prev.map((borrower) =>
            borrower.id === id ? { ...borrower, status: "Returned" } : borrower
          )
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred.");
    }
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowers.length === 0 ? (
            <tr>
              <td colSpan="9">No records found</td>
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
                <td>{borrower.status}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleReturnedBook(borrower.id)}
                    style={{ padding: "5px 10px", border: "1px solid grey", borderRadius: "5px" }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowersTable;
