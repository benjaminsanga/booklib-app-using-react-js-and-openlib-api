import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./PaperUpload.css";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";

const PaperUpload = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, clearErrors, setError } = useForm();
  const [documents, setDocuments] = useState([]);

  // Fetch all documents
  const fetchDocuments = async () => {
    const { data, error } = await supabase.from("documents").select("*");
    if (error) console.error("Error fetching documents:", error);
    else setDocuments(data);
  };

  // Handle form submission
  const onSubmit = async (formData) => {
    const { title, author, document_url } = formData;
    console.log({ title, author, document_url })

    const { data, error } = await supabase.from("documents").insert([
      {
        title,
        author,
        document_url: document_url[0],
      },
    ]);

    if (error) console.error("Error uploading document:", error);
    else {
      console.log("Document added:", data);
      reset();
      fetchDocuments();
    }
  };

  useEffect(() => {
    fetchDocuments();
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
        setValue("document_url", data.secure_url);
        clearErrors("document_url");
        toast.success("Document uploaded successfully");
      } catch (error) {
        console.error("Document upload failed:", error);
        toast.error("Failed to upload document");
      }
    } else {
      setError("document", { message: 'Cover is required' })
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
          <label htmlFor="document">Document</label>
          <input
            type="file"
            id="document"
            accept="application/pdf"
            onChange={handleImageChange}
          />
          {errors.document && <span className="error">{errors.document.message}</span>}
        </div>

        <button type="submit" className="submit-btn">Upload Document</button>
      </form>

      <h2>Uploaded Documents</h2>
      <table className="documents-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.title}</td>
              <td>{document.author}</td>
              <td>{document.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaperUpload;
