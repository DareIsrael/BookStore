// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import styles from "./AuthModal.module.css";

// const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
    
//     try {
//       await login(form.email, form.password);
//       onLoginSuccess();
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
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
        
//         <h2 className={styles.title}>Login to Continue</h2>
//         <p className={styles.subtitle}>Please login to complete your purchase</p>
        
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {error && <div className={styles.error}>{error}</div>}

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
//             placeholder="Password"
//             value={form.password}
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
//               "Login & Continue"
//             )}
//           </button>
//         </form>
//         <div className={styles.additionalLinks}>
//                   <a href="/forgot-password" className={styles.link}>
//                     Forgot your password?
//                   </a>
//                 </div>

//         <div className={styles.footer}>
//           <p>Don't have an account?{" "}
//             <button 
//               type="button" 
//               className={styles.switchButton}
//               onClick={onSwitchToRegister}
//             >
//               Register
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;


// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import styles from "./LoginModal.module.css";

// const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
    
//     try {
//       await login(form.email, form.password);
//       onLoginSuccess();
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
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
        
//         {/* Header with decorative elements */}
//         <div className={styles.modalHeader}>
//           <div className={styles.logoContainer}>
//             <span className={styles.logoIcon}>📚</span>
//           </div>
//           <h2 className={styles.title}>Welcome Back</h2>
//           <p className={styles.subtitle}>Sign in to access your account and continue your journey</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {error && (
//             <div className={styles.error}>
//               <span className={styles.errorIcon}>⚠️</span>
//               {error}
//             </div>
//           )}

//           <div className={styles.inputGroup}>
//             <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
//             <input 
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter your email"
//               value={form.email}
//               onChange={handleInputChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>
          
//           <div className={styles.inputGroup}>
//             <label htmlFor="password" className={styles.inputLabel}>Password</label>
//             <input 
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your password"
//               value={form.password}
//               onChange={handleInputChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>
          
//           <div className={styles.rememberForgot}>
//             <label className={styles.rememberMe}>
//               <input type="checkbox" className={styles.checkbox} />
//               <span className={styles.checkmark}></span>
//               Remember me
//             </label>
//             <a href="/forgot-password" className={styles.forgotLink}>
//               Forgot password?
//             </a>
//           </div>
          
//           <button 
//             type="submit" 
//             className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className={styles.spinner}></span>
//                 Signing in...
//               </>
//             ) : (
//               <>
//                 <span className={styles.buttonIcon}>🔑</span>
//                 Sign In
//               </>
//             )}
//           </button>
//         </form>

//         <div className={styles.divider}>
//           <span>or continue with</span>
//         </div>

//         <div className={styles.footer}>
//           <p>Don't have an account?{" "}
//             <button 
//               type="button" 
//               className={styles.switchButton}
//               onClick={onSwitchToRegister}
//             >
//               Create account
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./LoginModal.module.css";
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

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(form.email, form.password);
      onLoginSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
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
          
          {/* Header with decorative elements */}
          <div className={styles.modalHeader}>
            <div className={styles.logoContainer}>
              <span className={styles.logoIcon}>📚</span>
            </div>
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Sign in to access your account and continue your journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.error}>
                <span className={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
              <input 
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleInputChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <input 
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleInputChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className={styles.rememberForgot}>
              <label className={styles.rememberMe}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.checkmark}></span>
                Remember me
              </label>
              <a href="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className={`${styles.button} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Signing in...
                </>
              ) : (
                <>
                  <span className={styles.buttonIcon}>🔑</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span>or continue with</span>
          </div>

          <div className={styles.footer}>
            <p>Don't have an account?{" "}
              <button 
                type="button" 
                className={styles.switchButton}
                onClick={onSwitchToRegister}
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default LoginModal;