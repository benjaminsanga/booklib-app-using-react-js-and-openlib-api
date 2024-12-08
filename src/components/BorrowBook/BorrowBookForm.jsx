import React from "react";
import { useForm } from "react-hook-form";
import "./BorrowBookForm.css";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BorrowForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase.from("book_borrowing").insert([data]);
      if (error) {
        console.error("Error saving borrow details:", error);
        toast.error("Failed to save borrow details.");
      } else {
        toast.success("Borrow details saved successfully!");
        reset();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <form className="borrow-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="borrow-heading">
        <h2>Borrow a Book</h2>
        <Link to={"/borrowers"}><button>View Borrowers</button></Link>
      </div>

      <div className="form-group">
        <label>Borrower Name</label>
        <input
          type="text"
          {...register("borrower_name", { required: "Borrower name is required" })}
        />
        {errors.borrower_name && <p className="error">{errors.borrower_name.message}</p>}
      </div>

      <div className="form-group">
        <label>Borrower Email</label>
        <input
          type="email"
          {...register("borrower_email", {
            required: "Borrower email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.borrower_email && <p className="error">{errors.borrower_email.message}</p>}
      </div>

      <div className="form-group">
        <label>Borrower Phone</label>
        <input
          type="tel"
          {...register("borrower_phone", {
            required: "Borrower phone number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Phone number must be 10-15 digits",
            },
          })}
        />
        {errors.borrower_phone && <p className="error">{errors.borrower_phone.message}</p>}
      </div>

      <div className="form-group">
        <label>Library Card Number</label>
        <input
          type="text"
          {...register("library_card_number", { required: "Library card number is required" })}
        />
        {errors.library_card_number && (
          <p className="error">{errors.library_card_number.message}</p>
        )}
      </div>

      <div className="form-group">
        <label>Book Title</label>
        <input
          type="text"
          {...register("book_title", { required: "Book title is required" })}
        />
        {errors.book_title && <p className="error">{errors.book_title.message}</p>}
      </div>

      <div className="form-group">
        <label>Book Author</label>
        <input
          type="text"
          {...register("book_author", { required: "Book author is required" })}
        />
        {errors.book_author && <p className="error">{errors.book_author.message}</p>}
      </div>

      <div className="form-group">
        <label>Book ISBN</label>
        <input type="text" {...register("book_isbn", { maxLength: 13 })} />
        {errors.book_isbn && <p className="error">Field cannot exceed 13 characters</p>}
      </div>

      <div className="form-group">
        <label>Book ID</label>
        <input type="text" {...register("book_id")} />
      </div>

      <div className="form-group">
        <label>Borrow Date</label>
        <input
          type="date"
          {...register("borrow_date", { required: "Borrow date is required" })}
        />
        {errors.borrow_date && <p className="error">{errors.borrow_date.message}</p>}
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input
          type="date"
          {...register("due_date", { required: "Due date is required" })}
        />
        {errors.due_date && <p className="error">{errors.due_date.message}</p>}
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea {...register("notes")} />
      </div>

      <button type="submit" className="borrow-form-button">Submit</button>
    </form>
  );
};

export default BorrowForm;
