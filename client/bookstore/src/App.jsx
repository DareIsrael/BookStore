// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import BookList from "./pages/BookList";
// import BookDetails from "./pages/BookDetails";
// import Orders from "./pages/Orders";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<BookList />} />
//           <Route path="/books/:id" element={<BookDetails />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.module.css";
import UserDashboard from "./pages/UserDashboard";
import PrivateRoute from './components/PrivateRoute'
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Success from "./pages/Success";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="mainContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} /> 
            <Route path="/checkout/success" element={<Success />} /> 
            <Route path="/admindashboard" element={<AdminDashboard />} /> 
            
            <Route path="/dashboard" element={
                  <PrivateRoute>
                      <UserDashboard />
                  </PrivateRoute>
                } 
              />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;