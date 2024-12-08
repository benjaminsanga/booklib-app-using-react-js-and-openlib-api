import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [ocaid, setOcaid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const { description, title, covers, subject_places, subject_times, subjects, authors } = data;
          const newBook = {
            description: description ? description.value || description : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
            author: authors ? authors[0]?.name : "Unknown"
          };
          setBook(newBook);

          // Fetch ocaid from Internet Archive
          if (title) {
            getOcaid(title, authors?.length ? authors[0]?.name : "");
          }
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    }

    async function getOcaid(title, author) {
      try {
        const query = `title:"${encodeURIComponent(title)}"+AND+creator:"${encodeURIComponent(author)}"`;
        const archiveUrl = `https://archive.org/advancedsearch.php?q=${query}&fl[]=identifier&rows=1&output=json`;

        console.log("Fetching Internet Archive Data with URL:", archiveUrl);

        const archiveResponse = await fetch(archiveUrl);
        const archiveData = await archiveResponse.json();

        console.log("Internet Archive Response:", archiveData);

        if (archiveData?.response?.docs?.length > 0) {
          const ocaid = archiveData.response.docs[0].identifier;
          console.log("OCAID Found:", ocaid);
          setOcaid(ocaid);
        } else {
          console.warn("No OCAID found for this book.");
        }
      } catch (error) {
        console.error("Error fetching OCAID:", error);
      }
    }

    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <div className="action-buttons">
          <button type="button" className="flex flex-c back-btn" onClick={() => navigate("/book")}>
            <FaArrowLeft size={22} />
            <span className="fs-18 fw-6">Go Back</span>
          </button>
        </div>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <span>{book?.description}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Author: </span>
              <span>{book?.author}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subject Places: </span>
              <span className="text-italic">{book?.subject_places}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subject Times: </span>
              <span className="text-italic">{book?.subject_times}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>

        {ocaid ? (
          <div className="book-reader">
            <h3>Read the Book</h3>
            <iframe
              src={`https://archive.org/stream/${ocaid}`}
              title="Internet Archive Book Reader"
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="book-reader">
            <hr />
            <p className="text-center">This book does not have a readable version.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetails;
