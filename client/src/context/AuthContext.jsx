import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
  try {
    const res = await axios.post("/users/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token); // save token
    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || err.message);
    throw err;
  }
};

const register = async (data) => {
  try {
    const res = await axios.post("/users/register", data);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token); // save token
    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || err.message);
    throw err;
  }
};

const logout = () => {
  setUser(null);
  localStorage.removeItem("token");
};

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    // optionally decode token or fetch profile from backend
    // For now just mark user as logged in
    setUser({ token });
  }
  setLoading(false);
}, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError: () => setError(null) }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "../services/api";
// import { jwtDecode } from 'jwt-decode'; // Install with: npm install jwt-decode

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

// const decodeJWT = (token) => {
//   try {
//     return jwtDecode(token);
//   } catch (error) {
//     console.error('Failed to decode token:', error);
//     return null;
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const res = await axios.post("/users/login", { email, password });
//       setUser(res.data.user);
//       localStorage.setItem("token", res.data.token);
//       return res.data;
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       throw err;
//     }
//   };

//   const register = async (data) => {
//     try {
//       const res = await axios.post("/users/register", data);
//       setUser(res.data.user);
//       localStorage.setItem("token", res.data.token);
//       return res.data;
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//       throw err;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token found:", !!token);
    
//     if (token) {
//       try {
//         const userData = decodeJWT(token);
//         console.log("Decoded user data:", userData);
        
//         if (userData && userData.id) {
//           setUser({
//             id: userData.id,
//             email: userData.email,
//             name: userData.name,
//             role: userData.role,
//           });
//         } else {
//           console.log("Invalid token - removing");
//           localStorage.removeItem("token");
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Token decoding error:", error);
//         localStorage.removeItem("token");
//         setUser(null);
//       }
//     }
//     setLoading(false);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loading, 
//       error, 
//       login, 
//       register, 
//       logout, 
//       clearError: () => setError(null) 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };