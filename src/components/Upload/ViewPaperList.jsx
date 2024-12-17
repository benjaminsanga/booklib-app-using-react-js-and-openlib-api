import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import "./PaperUpload.css";

const ViewPaperList = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Fetch all documents
  const fetchDocuments = async () => {
    const { data, error } = await supabase.from("documents").select("*");
    if (error) console.error("Error fetching documents:", error);
    else setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const closePreview = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="borrowers-table-container">
      <h2>Uploaded Documents</h2>
      <table className="documents-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.title}</td>
              <td>{document.author}</td>
              <td>
                {document.document_url ? (
                  <button
                    onClick={() => setSelectedDocument(document.document_url)}
                    style={{ color: 'blueviolet', cursor: 'pointer' }}
                  >
                    View
                  </button>
                ) : (
                  <span style={{ color: 'gray' }}>No Document</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Document Viewer */}
      {selectedDocument && (
        <div className="pdf-viewer-overlay" style={overlayStyle}>
          <div className="pdf-viewer-container" style={viewerStyle}>
            <button onClick={closePreview} style={closeButtonStyle}>
              Close
            </button>
            <iframe
              src={selectedDocument}
              title="Document Viewer"
              style={iframeStyle}
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the overlay and PDF viewer
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const viewerStyle = {
  width: '80%',
  height: '80%',
  backgroundColor: '#fff',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

const iframeStyle = {
  flex: 1,
  width: '100%',
  border: 'none',
};

const closeButtonStyle = {
  alignSelf: 'flex-end',
  margin: '10px',
  padding: '5px 10px',
  cursor: 'pointer',
};

export default ViewPaperList;
