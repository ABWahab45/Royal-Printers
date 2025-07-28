import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

// Use environment variable or fallback to localhost for development
// In production, use empty string to make requests to same domain
const API_URL = process.env.NODE_ENV === 'production' 
  ? (process.env.REACT_APP_API_URL || '') 
  : (process.env.REACT_APP_API_URL || 'http://localhost:5000');

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("image");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { token } = useAuth();

  // Fetch media items when component mounts
  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/media`);
      setMediaItems(response.data);
    } catch (err) {
      console.error("Error fetching media items:", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file || !title) {
      setError("Please provide both a title and a file.");
      return;
    }

    // Determine file type based on MIME type
    let fileType = "document";
    if (file.type.startsWith("image/")) {
      fileType = "image";
    } else if (file.type.startsWith("video/")) {
      fileType = "video";
    }

    // Override with user selection if different
    if (type !== fileType) {
      fileType = type;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("type", fileType);

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/media/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(`File uploaded successfully! Path: ${res.data.filePath}`);
      setFile(null);
      setTitle("");
      // Reset the file input
      document.getElementById("fileInput").value = "";

      // Refresh the media items list
      fetchMediaItems();
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle media deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) {
      return;
    }

    setDeleteLoading(true);
    try {
      await axios.delete(`${API_URL}/api/media/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the media items list
      fetchMediaItems();
      setSuccess("Media deleted successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete media.");
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Render media preview based on type
  const renderMediaPreview = (item) => {
    const fullPath = `${API_URL}${item.filePath}`;

    if (item.type === "image") {
      return <img src={fullPath} alt={item.title} className="img-fluid rounded" style={{ maxHeight: "150px" }} />;
    } else if (item.type === "video") {
      return (
        <video controls className="img-fluid rounded" style={{ maxHeight: "150px" }}>
          <source src={fullPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return (
        <div className="document-preview d-flex align-items-center justify-content-center bg-light rounded" style={{ height: "150px" }}>
          <i className="bi bi-file-earmark-text" style={{ fontSize: "3rem" }}></i>
        </div>
      );
    }
  };

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Complaints</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row">
        {/* Upload Form */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Upload New Media</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">File</label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">File Type</label>
                  <select
                    className="form-select"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>
                  <div className="form-text">Select the type of file you are uploading.</div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload File"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Media List */}
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Uploaded Media</h4>
            </div>
            <div className="card-body">
              {mediaItems.length === 0 ? (
                <div className="alert alert-info">No media items found. Upload some files to see them here!</div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 g-4">
                  {mediaItems.map(item => (
                    <div key={item._id} className="col">
                      <div className="card h-100">
                        <div className="card-img-top" style={{ height: "150px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {renderMediaPreview(item)}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">
                            <small className="text-muted">
                              Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}<br />
                              Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                            </small>
                          </p>
                        </div>
                        <div className="card-footer bg-white border-top-0">
                          <div className="d-flex justify-content-between">
                            <a
                              href={`${API_URL}${item.filePath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              <i className="bi bi-eye me-1"></i> View
                            </a>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(item._id)}
                              disabled={deleteLoading}
                            >
                              <i className="bi bi-trash me-1"></i> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Upload;