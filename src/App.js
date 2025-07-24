
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Upload from "./pages/Upload";
// import { useAuth } from "./AuthContext";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return children;
// }

// function App() {
//   const { isAuthenticated, logout } = useAuth();
//   return (
//     <Router>
//       <header className="d-flex justify-content-center align-items-center py-3">
//         <div className="d-flex align-items-center">
//           <img src="/images/logo1.5.jpeg" alt="CRP Logo" className="logo me-3" style={{ height: 'auto', width: 'auto', objectFit: 'contain' }} />
//           <div>
//             <h2 className="logo-text mb-0">Classic Royal Printers</h2>
//             <p className="tagline mb-0">The Complete Printing Solutions</p>
//           </div>
//         </div>
//       </header>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container-fluid">
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
//               {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
//               {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
//               {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>}
//               {isAuthenticated && <li className="nav-item"><button onClick={logout} className="nav-link btn btn-link border-0 bg-transparent">Logout</button></li>}
//             </ul>
//           </div>
//         </div>
//       </nav>
//       <main className="container my-5">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
//           <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
//           <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </main>
//       <footer className="bg-primary text-white text-center py-3 mt-5">
//         <div className="container">
//           <p className="mb-0">&copy; 2025 Classic Royal Printers. All rights reserved.</p>
//         </div>
//       </footer>
//     </Router>
//   );
// }

// export default App;





import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import { useAuth } from "./AuthContext";
import bg from './assets/images/bglogo.jpeg';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}
      >
        <header className="d-flex justify-content-center align-items-center py-3">
          <div className="d-flex align-items-center">
            <img src="/images/logo1.5.jpeg" alt="CRP Logo" className="logo me-3" style={{ height: 'auto', width: 'auto', objectFit: 'contain' }} />
            <div>
              <h2 className="logo-text mb-0">Classic Royal Printers</h2>
              <p className="tagline mb-0">The Complete Printing Solutions</p>
            </div>
          </div>
        </header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                {!isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>}
                {isAuthenticated && <li className="nav-item"><Link className="nav-link" to="/upload">Upload</Link></li>}
                {isAuthenticated && <li className="nav-item"><button onClick={logout} className="nav-link btn btn-link border-0 bg-transparent">Logout</button></li>}
              </ul>
            </div>
          </div>
        </nav>

        <main className="container my-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        <footer className="bg-primary text-white text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">&copy; 2025 Classic Royal Printers. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;