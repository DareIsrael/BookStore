
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Register.module.css";

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(form);
//       navigate("/");
//     } catch {}
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Register</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <input 
//           type="text" 
//           placeholder="Full Name" 
//           value={form.name} 
//           onChange={e => setForm({...form, name: e.target.value})} 
//           className={styles.input}
//           required
//         />
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
//         <button type="submit" className={styles.button}>Register</button>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Register.module.css";

// export default function Register() {
//   const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
//   const [error, setError] = useState("");
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic client-side validation
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     try {
//       await register(form);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Register</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {error && <p className={styles.error}>{error}</p>}

//         <input 
//           type="text"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={e => setForm({...form, name: e.target.value})}
//           className={styles.input}
//           required
//         />
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
//         <input 
//           type="password"
//           placeholder="Confirm Password"
//           value={form.confirmPassword}
//           onChange={e => setForm({...form, confirmPassword: e.target.value})}
//           className={styles.input}
//           required
//         />
//         <button type="submit" className={styles.button}>Register</button>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import styles from "./Register.module.css";

// export default function Register() {
//   const [form, setForm] = useState({ 
//     name: "", 
//     email: "", 
//     password: "", 
//     confirmPassword: "" 
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

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
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Registration failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.registerWrapper}>
//         {/* Image Section - Hidden on mobile */}
//         <div className={styles.imageSection}>
//           <div className={styles.imageContent}>
//             <div className={styles.registerIcon}>👑</div>
//             <h2 className={styles.imageTitle}>Join Us</h2>
//             <p className={styles.imageSubtitle}>Start your journey today</p>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className={styles.formSection}>
//           <div className={styles.registerCard}>
//             <div className={styles.formHeader}>
//               <h2 className={styles.title}>Create Account</h2>
//               <p className={styles.subtitle}>Sign up to get started</p>
//             </div>
            
//             <form onSubmit={handleSubmit} className={styles.form}>
//               {error && (
//                 <div className={styles.error}>
//                   <span className={styles.errorIcon}>⚠️</span>
//                   {error}
//                 </div>
//               )}

//               <div className={styles.inputGroup}>
//                 <input 
//                   type="text"
//                   id="name"
//                   name="name"
//                   placeholder="Full Name"
//                   value={form.name}
//                   onChange={handleInputChange}
//                   className={styles.input}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className={styles.inputGroup}>
//                 <input 
//                   type="email"
//                   id="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={form.email}
//                   onChange={handleInputChange}
//                   className={styles.input}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className={styles.inputGroup}>
//                 <input 
//                   type="password"
//                   id="password"
//                   name="password"
//                   placeholder="Password"
//                   value={form.password}
//                   onChange={handleInputChange}
//                   className={styles.input}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className={styles.inputGroup}>
//                 <input 
//                   type="password"
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={form.confirmPassword}
//                   onChange={handleInputChange}
//                   className={styles.input}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
              
//               <div className={styles.terms}>
//                 <label className={styles.termsCheck}>
//                   <input type="checkbox" className={styles.checkbox} required />
//                   <span className={styles.checkmark}></span>
//                   I agree to the <a href="/terms" className={styles.termsLink}>Terms</a>
//                 </label>
//               </div>
              
//               <button 
//                 type="submit" 
//                 className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <span className={styles.spinner}></span>
//                     Creating account...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </form>

//             <div className={styles.loginLink}>
//               <p>Already have an account?{" "}
//                 <a href="/login" className={styles.loginText}>
//                   Sign in
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
import styles from "./Register.module.css";

export default function Register() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerWrapper}>
        {/* Image Section - Hidden on mobile */}
        <div className={styles.imageSection}>
          <div className={styles.imageContent}>
            <div className={styles.registerIcon}>👑</div>
            <h2 className={styles.imageTitle}>Join Us</h2>
            <p className={styles.imageSubtitle}>Start your journey today</p>
          </div>
        </div>

        {/* Form Section */}
        <div className={styles.formSection}>
          <div className={styles.registerCard}>
            <div className={styles.formHeader}>
              <h2 className={styles.title}>Create Account</h2>
              <p className={styles.subtitle}>Sign up to get started</p>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              {error && (
                <div className={styles.error}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}

              <div className={styles.inputGroup}>
                <input 
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className={styles.inputGroup}>
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <div className={styles.passwordInputContainer}>
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleInputChange}
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

              <div className={styles.inputGroup}>
                <div className={styles.passwordInputContainer}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
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
              
              <div className={styles.terms}>
                <label className={styles.termsCheck}>
                  <input type="checkbox" className={styles.checkbox} required />
                  <span className={styles.checkmark}></span>
                  I agree to the <a href="/terms" className={styles.termsLink}>Terms</a>
                </label>
              </div>
              
              <button 
                type="submit" 
                className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className={styles.loginLink}>
              <p>Already have an account?{" "}
                <a href="/login" className={styles.loginText}>
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}