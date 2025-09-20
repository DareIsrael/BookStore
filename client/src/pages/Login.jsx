
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Login.module.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(form.email, form.password);
//       navigate("/");
//     } catch {}
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Login</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={form.email} 
//           onChange={e => setForm({...form, email: e.target.value})} 
//           className={styles.input}
//           required
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={form.password} 
//           onChange={e => setForm({...form, password: e.target.value})} 
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>Login</button>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Login.module.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(form.email, form.password);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Login</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {error && <p className={styles.error}>{error}</p>}

//         <input 
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={e => setForm({...form, email: e.target.value})}
//           className={styles.input}
//           required
//         />
//         <input 
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={e => setForm({...form, password: e.target.value})}
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>Login</button>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Login.module.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
    
//     try {
//       await login(form.email, form.password);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.loginCard}>
//         <h2 className={styles.title}>Welcome Back</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {error && <div className={styles.error}>{error}</div>}

//           <input 
//             type="email"
//             placeholder="Email address"
//             value={form.email}
//             onChange={e => setForm({...form, email: e.target.value})}
//             className={styles.input}
//             required
//             disabled={isLoading}
//           />
          
//           <input 
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={e => setForm({...form, password: e.target.value})}
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
//               "Login"
//             )}
//           </button>
//         </form>

//         <div className={styles.additionalLinks}>
//           <a href="/forgot-password" className={styles.link}>
//             Forgot your password?
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Login.module.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
    
//     try {
//       await login(form.email, form.password);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.loginWrapper}>
//         {/* Image Section - Hidden on mobile */}
//         <div className={styles.imageSection}>
//           <div className={styles.imageContent}>
//             <div className={styles.lockIcon}>🔒</div>
//             <h2 className={styles.imageTitle}>Welcome Back</h2>
//             <p className={styles.imageSubtitle}>Access your account to continue</p>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className={styles.formSection}>
//           <div className={styles.loginCard}>
//             <div className={styles.formHeader}>
//               <h2 className={styles.title}>Sign In</h2>
//               <p className={styles.subtitle}>Enter your credentials</p>
//             </div>
            
//             <form onSubmit={handleSubmit} className={styles.form}>
//               {error && (
//                 <div className={styles.error}>
//                   <span className={styles.errorIcon}>⚠️</span>
//                   {error}
//                 </div>
//               )}

//               <div className={styles.inputGroup}>
//                 <label htmlFor="email" className={styles.inputLabel}>Email</label>
//                 <input 
//                   type="email"
//                   id="email"
//                   placeholder="Your email"
//                   value={form.email}
//                   onChange={e => setForm({...form, email: e.target.value})}
//                   className={styles.input}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className={styles.inputGroup}>
//                 <label htmlFor="password" className={styles.inputLabel}>Password</label>
//                 <input 
//                   type="password"
//                   id="password"
//                   placeholder="Your password"
//                   value={form.password}
//                   onChange={e => setForm({...form, password: e.target.value})}
//                   className={styles.input}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className={styles.rememberForgot}>
//                 <label className={styles.rememberMe}>
//                   <input type="checkbox" className={styles.checkbox} />
//                   <span className={styles.checkmark}></span>
//                   Remember me
//                 </label>
//                 <a href="/forgot-password" className={styles.forgotLink}>
//                   Forgot password?
//                 </a>
//               </div>
              
//               <button 
//                 type="submit" 
//                 className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className={styles.spinner}></span>
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             <div className={styles.signupLink}>
//               <p>Don't have an account?{" "}
//                 <a href="/register" className={styles.signupText}>
//                   Sign up
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Login.module.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginWrapper}>
        {/* Image Section - Hidden on mobile */}
        <div className={styles.imageSection}>
          <div className={styles.imageContent}>
            <div className={styles.lockIcon}>🔒</div>
            <h2 className={styles.imageTitle}>Welcome Back</h2>
            <p className={styles.imageSubtitle}>Access your account to continue</p>
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          <div className={styles.loginCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Sign In</h2>
              <p className={styles.subtitle}>Enter your credentials</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>Email</label>
                <input 
                  type="email"
                  id="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className={styles.input}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>Password</label>
                <div className={styles.passwordInputContainer}>
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Your password"
                    value={form.password}
                    onChange={e => setForm({...form, password: e.target.value})}
                    className={styles.input}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg className={styles.eyeIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
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
                  "Sign In"
                )}
              </button>
            </form>

            <div className={styles.signupLink}>
              <p>Don't have an account?{" "}
                <a href="/register" className={styles.signupText}>
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}