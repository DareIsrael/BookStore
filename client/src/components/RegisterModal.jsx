// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import styles from "./AuthModal.module.css";

// const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
//   const [form, setForm] = useState({ 
//     name: "", 
//     email: "", 
//     password: "", 
//     confirmPassword: "" 
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { register } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     // Basic client-side validation
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await register(form);
//       onRegisterSuccess();
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay} onClick={handleOverlayClick}>
//       <div className={styles.modalContent}>
//         <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button>
        
//         <h2 className={styles.title}>Create Account</h2>
//         <p className={styles.subtitle}>Join our community of faith-filled readers</p>
        
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {error && <div className={styles.error}>{error}</div>}

//           <input 
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleInputChange}
//             className={styles.input}
//             required
//             disabled={isLoading}
//           />
          
//           <input 
//             type="email"
//             name="email"
//             placeholder="Email address"
//             value={form.email}
//             onChange={handleInputChange}
//             className={styles.input}
//             required
//             disabled={isLoading}
//           />
          
//           <input 
//             type="password"
//             name="password"
//             placeholder="Password (min. 6 characters)"
//             value={form.password}
//             onChange={handleInputChange}
//             className={styles.input}
//             required
//             minLength={6}
//             disabled={isLoading}
//           />
          
//           <input 
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={form.confirmPassword}
//             onChange={handleInputChange}
//             className={styles.input}
//             required
//             disabled={isLoading}
//           />
          
//           <button 
//             type="submit" 
//             className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <span className={styles.spinner}></span>
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         <div className={styles.footer}>
//           <p>Already have an account?{" "}
//             <button 
//               type="button" 
//               className={styles.switchButton}
//               onClick={onSwitchToLogin}
//             >
//               Sign in
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterModal;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./RegisterModal.module.css";
import ReactDOM from "react-dom";

// Create a portal component
const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");
  
  // Create a div for the portal if it doesn't exist
  if (!modalRoot) {
    const newModalRoot = document.createElement("div");
    newModalRoot.id = "modal-root";
    document.body.appendChild(newModalRoot);
    return ReactDOM.createPortal(children, newModalRoot);
  }
  
  return ReactDOM.createPortal(children, modalRoot);
};

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic client-side validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      await register(form);
      onRegisterSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join our community of faith-filled readers</p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <input 
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInputChange}
              className={styles.input}
              required
              disabled={isLoading}
            />
            
            <input 
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleInputChange}
              className={styles.input}
              required
              disabled={isLoading}
            />
            
            <input 
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              value={form.password}
              onChange={handleInputChange}
              className={styles.input}
              required
              minLength={6}
              disabled={isLoading}
            />
            
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleInputChange}
              className={styles.input}
              required
              disabled={isLoading}
            />
            
            <button 
              type="submit" 
              className={`${styles.button} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <p>Already have an account?{" "}
              <button 
                type="button" 
                className={styles.switchButton}
                onClick={onSwitchToLogin}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default RegisterModal;