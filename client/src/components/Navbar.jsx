// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   return (
//     <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
//       <Link to="/">Books</Link> |{" "}
//       {user ? (
//         <>
//           <Link to="/orders">Orders</Link> | 
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
//         </>
//       )}
//     </nav>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbarLogo} onClick={closeMenu}>
        <span>Winifred</span>
        <span>Fagbolagun</span>
      </Link>
      
      <div className={`${styles.navbarLinks} ${isOpen ? styles.open : ''}`}>
        <Link to="/" className={styles.navbarLink} onClick={closeMenu}>Home</Link>
        <Link to="/books" className={styles.navbarLink} onClick={closeMenu}>Books</Link>
        <Link to="/videos" className={styles.navbarLink} onClick={closeMenu}>Coaching</Link>
        <Link to="/about" className={styles.navbarLink} onClick={closeMenu}>About</Link>
        <Link to="/contact" className={styles.navbarLink} onClick={closeMenu}>Contact</Link>
       
         {user ? (
          <>
            <Link to="/dashboard" className={styles.navbarLink} onClick={closeMenu}>Dashboard</Link>
            {/* <Link to="/orders" className={styles.navbarLink} onClick={closeMenu}>Orders</Link> */}
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            
            <Link to="/login" className={styles.navbarLink} onClick={closeMenu}>Login</Link>
            <Link to="/register" className={styles.registerButton} onClick={closeMenu}>
              Register
            </Link>
          </>
        )}
      </div>
      
      <div 
        className={`${styles.navbarToggle} ${isOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  );
// }
}
