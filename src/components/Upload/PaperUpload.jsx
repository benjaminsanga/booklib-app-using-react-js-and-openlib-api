import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./PaperUpload.css";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

// Supabase Configuration
const supabaseUrl = "https://your-supabase-url.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "your-supabase-key"; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

const PaperUpload = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, clearErrors, setError } = useForm();
  const [books, setBooks] = useState([]);

  // Fetch all books
  const fetchBooks = async () => {
    const { data, error } = await supabase.from("books").select("*");
    if (error) console.error("Error fetching books:", error);
    else setBooks(data);
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    const { title, author, description, cover } = formData;

    const { data, error } = await supabase.from("books").insert([
      {
        title,
        author,
        description,
        cover: cover[0], // Save the file reference
      },
    ]);

    if (error) console.error("Error uploading book:", error);
    else {
      console.log("Book added:", data);
      reset();
      fetchBooks(); // Refresh the book list
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
  
      formData.append("file", file);
      formData.append("upload_preset", "nasfa-dbms");
  
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dlbeorqf7/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!res.ok) {
          throw new Error("Failed to upload image");
        }
  
        const data = await res.json();
        setValue("photo_url", data.secure_url);
        clearErrors("photo_url");
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image");
      }
    } else {
      setError("cover", { message: 'Cover is required' })
    }
  };

  return (
    <div className="admin-upload">
      <h1>Upload Paper</h1>
      <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="form-control"
          />
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            {...register("author", { required: "Author is required" })}
          />
          {errors.author && <span className="error">{errors.author.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <span className="error">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cover">Book Cover</label>
          <input
            type="file"
            id="cover"
            onChange={handleImageChange}
          />
          {errors.cover && <span className="error">{errors.cover.message}</span>}
        </div>

        <button type="submit" className="submit-btn">Upload Book</button>
      </form>

      <h2>Uploaded Books</h2>
      <table className="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaperUpload;
