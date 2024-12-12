import React from "react";
import { useForm } from "react-hook-form";
import "./PaperUpload.css";
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

const PaperUpload = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, clearErrors, setError } = useForm();
  const userRole = localStorage.getItem("nasfa-user-role")
  
  // Handle form submission
  const onSubmit = async (formData) => {
    const { title, author, document_url } = formData;
    const { data, error } = await supabase.from("documents").insert([
      {
        title,
        author,
        document_url: document_url,
      },
    ]);
    console.log(data)
    if (error) toast.error("Error uploading document");
    else {
      toast.success("Document added successfully");
      reset();
    }
  };

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
      setError("document_url", { message: 'Document is required' })
    }
  };

  return (
    <div className="admin-upload">
      <div className="upload-heading">
        <h2>Upload Paper</h2>
        <Link to={"/upload-papers-list"}><button>View Uploaded Papers</button></Link>
      </div>
      {userRole === "admin" && <>
        <form className="upload-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="paper-form-control"
            />
            {errors.title && <span className="error">{errors.title.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              className="paper-form-control"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <span className="error">{errors.author.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="document_url">Document</label>
            <input
              type="file"
              id="document_url"
              accept="application/pdf"
              className="paper-form-control"
              onChange={handleImageChange}
            />
            {errors.document_url && <span className="error">{errors.document_url.message}</span>}
          </div>

          <button type="submit" className="submit-btn">Upload Document</button>
        </form>  
      </>}    
    </div>
  );
};

export default PaperUpload;
