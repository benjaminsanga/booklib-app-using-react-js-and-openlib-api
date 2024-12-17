import React from "react";
import { useForm } from "react-hook-form";
import "./PaperUpload.css";
import toast from "react-hot-toast";
import AWS from "aws-sdk";
import { supabase } from "../../lib/supabase";
import { Link } from "react-router-dom";

const PaperUpload = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, setError } = useForm();
  const userRole = localStorage.getItem("nasfa-user-role");

  // AWS S3 Configuration
  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });
  const bucketName = process.env.REACT_APP_S3_BUCKET_NAME;

  const onSubmit = async (formData) => {
    const { title, author, document_url } = formData;

    if (!!title || !!author || !!document_url) {
      toast.error("Fill all fields")
      return;
    }

    const { data, error } = await supabase.from("documents").insert([
      { title, author, document_url },
    ]);
    
    console.log("data:", data)
    if (error) toast.error("Error uploading document");
    else {
      toast.success("Document added successfully");
      reset();
    }
  };

  const handleFileUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileName = `${Date.now()}-${file.name}`; // Unique file name

      const params = {
        Bucket: bucketName, // Ensure this is set correctly
        Key: fileName, // The file name in the bucket
        Body: file, // The file content
        ContentType: file.type, // The MIME type of the file
      };
      
      try {
        const uploadResult = await s3.upload(params).promise();
        console.log("Upload Result:", uploadResult);
        const fileUrl = uploadResult.Location;
        setValue("document_url", fileUrl);
        toast.success("Document uploaded successfully");
      } catch (error) {
        console.error("Error uploading to S3:", error);
        toast.error("Failed to upload document");
      }
      
    } else {
      setError("document_url", { message: "Document is required" });
    }
  };

  return (
    <div className="admin-upload">
      <div className="upload-heading">
        <h2>Upload Paper</h2>
        <Link to={"/upload-papers-list"}><button>View Uploaded Papers</button></Link>
      </div>
      {userRole === "admin" && (
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
              onChange={handleFileUpload}
            />
            {errors.document_url && <span className="error">{errors.document_url.message}</span>}
          </div>
          <button type="submit" className="submit-btn">Upload Document</button>
        </form>
      )}
    </div>
  );
};

export default PaperUpload;
