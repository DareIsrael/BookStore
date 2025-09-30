// import React, { useState } from "react";
// import styles from "./AddressModal.module.css";

// export default function AddressModal({ isOpen, onClose, onSubmit, user }) {
//   const [form, setForm] = useState({
//     name: user ? `${user.firstName} ${user.lastName}` : "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       await onSubmit(form);
//     } catch (error) {
//       console.error("Error submitting address:", error);
//       alert("Failed to process address. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div className={styles.modalContent}>
//         <button className={styles.closeButton} onClick={onClose}>
//           &times;
//         </button>
        
//         <div className={styles.modalHeader}>
//           <h2 className={styles.title}>Delivery Address</h2>
//           <p className={styles.subtitle}>Enter your delivery information</p>
//         </div>
        
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.inputGroup}>
//             <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Enter your full name"
//               value={form.name}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="phone" className={styles.inputLabel}>Phone Number</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               placeholder="Enter your phone number"
//               value={form.phone}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="street" className={styles.inputLabel}>Street Address</label>
//             <input
//               type="text"
//               id="street"
//               name="street"
//               placeholder="Enter your street address"
//               value={form.street}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="city" className={styles.inputLabel}>City</label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               placeholder="Enter your city"
//               value={form.city}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="state" className={styles.inputLabel}>State/Province</label>
//             <input
//               type="text"
//               id="state"
//               name="state"
//               placeholder="Enter your state or province"
//               value={form.state}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="postalCode" className={styles.inputLabel}>Postal Code</label>
//             <input
//               type="text"
//               id="postalCode"
//               name="postalCode"
//               placeholder="Enter your postal code"
//               value={form.postalCode}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.inputGroup}>
//             <label htmlFor="country" className={styles.inputLabel}>Country</label>
//             <input
//               type="text"
//               id="country"
//               name="country"
//               placeholder="Enter your country"
//               value={form.country}
//               onChange={handleChange}
//               className={styles.input}
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className={styles.buttonGroup}>
//             <button 
//               type="button" 
//               onClick={onClose} 
//               className={styles.cancelButton}
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className={styles.spinner}></span>
//                   Processing...
//                 </>
//               ) : (
//                 "Continue to Payment"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import styles from "./AddressModal.module.css";
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

export default function AddressModal({ isOpen, onClose, onSubmit, user }) {
  const [form, setForm] = useState({
    // name: user ? `${user.name}` : "",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onSubmit(form);
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("Failed to process address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          
          <div className={styles.modalHeader}>
            <h2 className={styles.title}>Delivery Address</h2>
            <p className={styles.subtitle}>Enter your delivery information</p>
          </div>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.inputLabel}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="street" className={styles.inputLabel}>Street Address</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Enter your street address"
                value={form.street}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.inputLabel}>City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                value={form.city}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="state" className={styles.inputLabel}>State/Province</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter your state or province"
                value={form.state}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="postalCode" className={styles.inputLabel}>Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Enter your postal code"
                value={form.postalCode}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="country" className={styles.inputLabel}>Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={form.country}
                onChange={handleChange}
                className={styles.input}
                required
                disabled={isLoading}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                onClick={onClose} 
                className={styles.cancelButton}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Processing...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalPortal>
  );
}