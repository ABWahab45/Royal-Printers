import React, { useState, useEffect } from "react";
import axios from "axios";

// Use environment variable or fallback to localhost for development
// In production, use empty string to make requests to same domain
// const API_URL = process.env.NODE_ENV === 'production' 
//   ? (process.env.REACT_APP_API_URL || '') 
//   : (process.env.REACT_APP_API_URL || 'http://localhost:5000');

// For development - using localhost directly
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products from the backend
        const productsResponse = await axios.get(`${API_URL}/api/products`);
        setProducts(productsResponse.data);
//commit
        // Fetch media items that are images and have 'product' in the title
        const mediaResponse = await axios.get(`${API_URL}/api/media`);
        const productImages = mediaResponse.data.filter(
          item => item.type === "image" && item.title.toLowerCase().includes("product")
        );
        setMedia(productImages);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="products" className="text-center">
      <h2>Our Products</h2>

      {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}

      {error && <div className="alert alert-danger">{error}</div>}

      {/* {!loading && !error && products.length === 0 && media.length === 0 && (
        <div className="alert alert-info">No products found. Please check back later!</div>
      )} */}

      {/* Display products from the database if available */}
      {!loading && !error && products.length > 0 && (
        <div className="mb-5">
          <h3>Featured Products</h3>
          <ul className="product-list">
            {products.map(product => (
              <li key={product._id} className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text text-primary fw-bold">${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display uploaded product images if available */}
      {!loading && !error && media.length > 0 && (
        <div className="mb-5">
          <h3>Product Gallery</h3>
          <ul className="product-list">
            {media.map(item => (
              <li key={item._id}>
                <img
                  src={`${API_URL}${item.filePath}`}
                  alt={item.title}
                  className="img-fluid rounded shadow-sm"
                />
                <p className="mt-2">{item.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Legacy content as fallback */}
      {!loading && !error && products.length === 0 && media.length === 0 && (
        <div className="mt-4">
          {/* <h3>Sample Products</h3> */}
          <ul className="product-list">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <li key={i}><img src={`/images/product (${i}).jpg`} alt={`Product ${i}`} /></li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Products;