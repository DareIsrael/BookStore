// import React from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { stripePromise } from "../services/stripe";

// export default function CheckoutButton({ item }) {
//   const { user } = useAuth();

//   const handleCheckout = async () => {
//     if (!user) return alert("Please log in first");

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/orders/create-checkout-session`,
//         {
//           items: [
//             {
//               bookId: item._id,  // ✅ only send bookId
//               quantity: 1        // ✅ fixed since no cart
//             },
//           ],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res.data;
//       if (!data.success) return alert(data.message || "Checkout failed");

//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: data.sessionId });
//     } catch (error) {
//       console.error("Checkout error:", error.response?.data || error.message);
//       alert("Something went wrong with checkout");
//     }
//   };

//   return <button onClick={handleCheckout}>Buy Now</button>;
// }




// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { stripePromise } from "../services/stripe";
// import styles from "./CheckoutButton.module.css";

// export default function CheckoutButton({ item }) {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCheckout = async () => {
//     if (!user) {
//       alert("Please log in first");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/orders/create-checkout-session`,
//         {
//           items: [
//             {
//               bookId: item._id,
//               quantity: 1
//             },
//           ],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res.data;
//       if (!data.success) {
//         alert(data.message || "Checkout failed");
//         setIsLoading(false);
//         return;
//       }

//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({ 
//         sessionId: data.sessionId 
//       });
      
//       if (error) {
//         console.error("Stripe redirect error:", error);
//         alert("Redirect to checkout failed");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error.response?.data || error.message);
//       alert("Something went wrong with checkout");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button 
//       className={`${styles.checkoutButton} ${isLoading ? styles.loading : ''}`}
//       onClick={handleCheckout}
//       disabled={isLoading}
//     >
//       {isLoading ? (
//         <>
//           <div className={styles.spinner}></div>
//           Processing...
//         </>
//       ) : (
//         <>
//           <svg className={styles.cartIcon} viewBox="0 0 24 24" width="20" height="20">
//             <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
//           </svg>
//           Buy Now - ${item.price}
//         </>
//       )}
//     </button>
//   );
// }

// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { stripePromise } from "../services/stripe";
// import styles from "./CheckoutButton.module.css";

// export default function CheckoutButton({ item }) {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCheckout = async () => {
//     if (!user) {
//       alert("Please log in first");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/orders/create-checkout-session`,
//         {
//           items: [
//             {
//               bookId: item._id,
//               quantity: 1
//             },
//           ],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res.data;
//       if (!data.success) {
//         alert(data.message || "Checkout failed");
//         setIsLoading(false);
//         return;
//       }

//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({ 
//         sessionId: data.sessionId 
//       });
      
//       if (error) {
//         console.error("Stripe redirect error:", error);
//         alert("Redirect to checkout failed");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error.response?.data || error.message);
//       alert("Something went wrong with checkout");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button 
//       className={`${styles.checkoutButton} ${isLoading ? styles.loading : ''}`}
//       onClick={handleCheckout}
//       disabled={isLoading}
//     >
//       {isLoading ? (
//         <>
//           <div className={styles.spinner}></div>
//           Processing...
//         </>
//       ) : (
//         <>
//           <svg className={styles.cartIcon} viewBox="0 0 24 24" width="20" height="20">
//             <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
//           </svg>
//           Buy Now - ${item.price}
//         </>
//       )}
//     </button>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { stripePromise } from "../services/stripe";
// import LoginModal from "./LoginModal";
// import RegisterModal from "./RegisterModal";
// import styles from "./CheckoutButton.module.css";

// export default function CheckoutButton({ item }) {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);

//   const handleCheckout = async () => {
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }

//     await processCheckout();
//   };

//   const processCheckout = async () => {
//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/orders/create-checkout-session`,
//         {
//           items: [
//             {
//               bookId: item._id,
//               quantity: 1
//             },
//           ],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res.data;
//       if (!data.success) {
//         alert(data.message || "Checkout failed");
//         setIsLoading(false);
//         return;
//       }

//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({ 
//         sessionId: data.sessionId 
//       });
      
//       if (error) {
//         console.error("Stripe redirect error:", error);
//         alert("Redirect to checkout failed");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error.response?.data || error.message);
//       alert("Something went wrong with checkout");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLoginSuccess = () => {
//     processCheckout();
//   };

//   const handleRegisterSuccess = () => {
//     processCheckout();
//   };

//   const switchToRegister = () => {
//     setShowLoginModal(false);
//     setShowRegisterModal(true);
//   };

//   const switchToLogin = () => {
//     setShowRegisterModal(false);
//     setShowLoginModal(true);
//   };

//   const closeAllModals = () => {
//     setShowLoginModal(false);
//     setShowRegisterModal(false);
//   };

//   return (
//     <>
//       <button 
//         className={`${styles.checkoutButton} ${isLoading ? styles.loading : ''}`}
//         onClick={handleCheckout}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <>
//             <div className={styles.spinner}></div>
//             Processing...
//           </>
//         ) : (
//           <>
//             <svg className={styles.cartIcon} viewBox="0 0 24 24" width="20" height="20">
//               <path fill="currentColor" d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
//             </svg>
//             Buy Now - ${item.price}
//           </>
//         )}
//       </button>

//       <LoginModal
//         isOpen={showLoginModal}
//         onClose={closeAllModals}
//         onSwitchToRegister={switchToRegister}
//         onLoginSuccess={handleLoginSuccess}
//       />

//       <RegisterModal
//         isOpen={showRegisterModal}
//         onClose={closeAllModals}
//         onSwitchToLogin={switchToLogin}
//         onRegisterSuccess={handleRegisterSuccess}
//       />
//     </>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { stripePromise } from "../services/stripe";
// import LoginModal from "./LoginModal";
// import RegisterModal from "./RegisterModal";
// import AddressModal from "../pages/AddressModal";
// import styles from "./CheckoutButton.module.css";

// export default function CheckoutButton({ item }) {
//   const { user } = useAuth();
//   const [isLoading, setIsLoading] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [showAddressModal, setShowAddressModal] = useState(false);

//   const handleCheckout = () => {
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }
//     setShowAddressModal(true);
//   };

//   const handleLoginSuccess = () => {
//     setShowLoginModal(false);
//     setShowAddressModal(true);
//   };

//   const handleSwitchToRegister = () => {
//     setShowLoginModal(false);
//     setShowRegisterModal(true);
//   };

//   const handleRegisterSuccess = () => {
//     setShowRegisterModal(false);
//     setShowAddressModal(true);
//   };

//   const handleSwitchToLogin = () => {
//     setShowRegisterModal(false);
//     setShowLoginModal(true);
//   };

//   const processCheckout = async (addressData) => {
//     setIsLoading(true);

//     try {
//       const token = localStorage.getItem("token");

//       // Prepare address in the format your backend expects
//       const address = {
//         name: addressData.name || `${user.firstName} ${user.lastName}`,
//         phone: addressData.phone,
//         street: addressData.street,
//         city: addressData.city,
//         state: addressData.state,
//         postalCode: addressData.postalCode,
//         country: addressData.country
//       };

//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/orders/create-checkout-session`,
//         {
//           items: [
//             {
//               bookId: item._id,
//               quantity: 1,
//             },
//           ],
//           address, // Send address data
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = res.data;
//       if (!data.success) {
//         alert(data.message || "Checkout failed");
//         return;
//       }

//       const stripe = await stripePromise;
//       const { error } = await stripe.redirectToCheckout({
//         sessionId: data.sessionId,
//       });

//       if (error) {
//         console.error("Stripe redirect error:", error);
//         alert("Redirect to checkout failed");
//       }
//     } catch (error) {
//       console.error("Checkout error:", error.response?.data || error.message);
//       alert("Something went wrong with checkout");
//     } finally {
//       setIsLoading(false);
//       setShowAddressModal(false);
//     }
//   };

//   return (
//     <>
//       <button
//         className={`${styles.checkoutButton} ${isLoading ? styles.loading : ""}`}
//         onClick={handleCheckout}
//         disabled={isLoading}
//       >
//         {isLoading ? "Processing..." : "Buy Now" }
//       </button>

//       <LoginModal
//         isOpen={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//         onSwitchToRegister={handleSwitchToRegister}
//         onLoginSuccess={handleLoginSuccess}
//       />

//       <RegisterModal
//         isOpen={showRegisterModal}
//         onClose={() => setShowRegisterModal(false)}
//         onSwitchToLogin={handleSwitchToLogin}
//         onRegisterSuccess={handleRegisterSuccess}
//       />

//       <AddressModal
//         isOpen={showAddressModal}
//         onClose={() => setShowAddressModal(false)}
//         onSubmit={processCheckout}
//         user={user}
//       />
//     </>
//   );
// }


import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { stripePromise } from "../services/stripe";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import AddressModal from "../pages/AddressModal";
import styles from "./CheckoutButton.module.css";

export default function CheckoutButton({ item }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // ✅ detect if item is a video
  const isVideo = item && item.hasOwnProperty("introVideo");

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (isVideo) {
      // 🎥 Direct checkout for videos (no address)
      processCheckout();
    } else {
      // 📚 Require address for books
      setShowAddressModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    handleCheckout();
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
    handleCheckout();
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const processCheckout = async (addressData = {}) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const body = {
        items: [
          isVideo
            ? { videoId: item._id }        // videos don't need quantity/address
            : { bookId: item._id, quantity: 1 },
        ],
      };

      if (!isVideo) {
        // only add address for books
        body.address = {
          name: addressData.name || `${user.firstName} ${user.lastName}`,
          phone: addressData.phone,
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          postalCode: addressData.postalCode,
          country: addressData.country,
        };
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders/create-checkout-session`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;

      if (!data.success) {
        alert(data.message || "Checkout failed");
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        console.error("Stripe redirect error:", error);
        alert("Redirect to checkout failed");
      }

    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert("Something went wrong with checkout");
    } finally {
      setIsLoading(false);
      setShowAddressModal(false);
    }
  };

  return (
    <>
      <button
        className={`${styles.checkoutButton} ${isLoading ? styles.loading : ""}`}
        onClick={handleCheckout}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Buy Now"}
      </button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Show address modal only for books */}
      {!isVideo && (
        <AddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          onSubmit={processCheckout}
          user={user}
        />
      )}
    </>
  );
}
