import React, { useState, useEffect } from "react";
import axios from "axios";

// Use environment variable or fallback to localhost for development
// In production, use empty string to make requests to same domain
// const API_URL = process.env.NODE_ENV === 'production' 
//   ? (process.env.REACT_APP_API_URL || '') 
//   : (process.env.REACT_APP_API_URL || 'http://localhost:5000');

// For development - using localhost directly
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/media`);
        setMedia(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching media:", err);
        setError("Failed to load media. Please try again later.");
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const renderMediaItem = (item) => {
    const serverUrl = API_URL;
    const fullPath = `${serverUrl}${item.filePath}`;

    if (item.type === "image") {
      return <img key={item._id} src={fullPath} alt={item.title} />;
    } else if (item.type === "video") {
      return (
        <video key={item._id} controls>
          <source src={fullPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      // For documents, show a link
      return (
        <div key={item._id} className="document-item">
          <a href={fullPath} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
            <i className="bi bi-file-earmark-text me-2"></i>
            {item.title}
          </a>
        </div>
      );
    }
  };

  return (
    <section id="gallery" className="text-center">
      <h2>Gallery</h2>

      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* {!loading && !error && media.length === 0 && (
        <div className="alert alert-info">No media items found. Upload some content to see it here!</div>
      )} */}

      {!loading && !error && media.length > 0 && (
        <div className="gallery-grid">
          {media.map(item => renderMediaItem(item))}
        </div>
      )}

      {/* Legacy content as fallback */}
      {!loading && !error && media.length === 0 && (
        <div className="gallery-grid mt-4">
          {/* <h3 className="w-100 mb-3">Sample Content</h3> */}
          {[1, 2, 3, 4, 5, 6, 8, 9].map(i => (
            <img key={i} src={`/images/machines (${i}).jpg`} alt={`machines(${i})`} />
          ))}
          <img src="/images/bobst sp.jpeg" alt="bobst sp" />
          <img src="/images/die cutter.jpeg" alt="die cutter" />
          <img src="/images/fold and glue.jpg" alt="fold and glue" />
          <img src="/images/heidelberg.jpeg" alt="heidelberg" />
          <video controls>
            <source src="/videos/sample1.mp4" type="video/mp4" />
          </video>
          <video controls>
            <source src="/videos/sample2.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </section>
  );
};

export default Gallery;