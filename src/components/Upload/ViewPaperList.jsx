import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase';
import "./PaperUpload.css";

const ViewPaperList = () => {

  const [documents, setDocuments] = useState([]);

  // Fetch all documents
  const fetchDocuments = async () => {
    const { data, error } = await supabase.from("documents").select("*");
    if (error) console.error("Error fetching documents:", error);
    else setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="borrowers-table-container">
      <h2>Uploaded Documents</h2>
      <table className="documents-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.title}</td>
              <td>{document.author}</td>
              <td>
                <a href={document.document_url} target="_blank" rel="noopener noreferrer" style={{ color: 'blueviolet' }}>
                  Document
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewPaperList