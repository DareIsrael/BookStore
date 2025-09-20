// import React, { useState } from "react";
// import styles from "./Contact.module.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setSubmitMessage("Thank you for your message! I'll get back to you soon.");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (error) {
//       setSubmitMessage("Sorry, there was an error sending your message. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//       setTimeout(() => setSubmitMessage(""), 5000);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Background Image with Overlay */}
//       <div className={styles.backgroundOverlay}></div>
      
//       <section className={styles.heroSection}>
//         <div className={styles.heroContent}>
//           <h1 className={styles.heroTitle}>Get In Touch</h1>
//           <p className={styles.heroSubtitle}>
//             I'd love to hear from you! Whether you have questions about my books, coaching, or just want to connect.
//           </p>
//         </div>
//       </section>

//       <section className={styles.contactSection}>
//         <div className={styles.contactContent}>
//           {/* Contact Form */}
//           <div className={styles.formContainer}>
//             <h2 className={styles.sectionTitle}>Send Me a Message</h2>
//             <form onSubmit={handleSubmit} className={styles.contactForm}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="name" className={styles.formLabel}>Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={styles.formInput}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="email" className={styles.formLabel}>Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={styles.formInput}
//                   required
//                 />
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="message" className={styles.formLabel}>Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className={styles.formTextarea}
//                   rows="5"
//                   required
//                 ></textarea>
//               </div>

//               <button 
//                 type="submit" 
//                 className={styles.submitButton}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <span className={styles.spinner}></span>
//                     Sending...
//                   </>
//                 ) : (
//                   "Send Message"
//                 )}
//               </button>

//               {submitMessage && (
//                 <div className={styles.submitMessage}>{submitMessage}</div>
//               )}
//             </form>
//           </div>

//           {/* Social Links and Info */}
//           <div className={styles.infoContainer}>
//             <h2 className={styles.sectionTitle}>Connect With Me</h2>
//             <div className={styles.socialLinks}>
//               <a 
//                 href="https://www.instagram.com/winifredfasuyi?igsh=Y21wZzNzM2EzejV3" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className={styles.socialLink}
//               >
//                 <span className={styles.socialIcon}>📷</span>
//                 <span>Instagram</span>
//               </a>
//             </div>

//             <div className={styles.emailSignup}>
//               <h3>Join Our Community</h3>
//               <p>Subscribe to get updates on new books, resources, and encouragement for your journey.</p>
//               <form className={styles.signupForm}>
//                 <input 
//                   type="email" 
//                   placeholder="Enter your email" 
//                   className={styles.emailInput}
//                   required
//                 />
//                 <button type="submit" className={styles.signupButton}>Subscribe</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from "react";
import styles from "./Contact.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Initialize AOS
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitMessage("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitMessage("Sorry, there was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Image with Overlay */}
      <div className={styles.backgroundOverlay}></div>
      
      <section className={styles.heroSection}>
        <div className={styles.heroContent} data-aos="fade-up">
          <h1 className={styles.heroTitle}>Get In Touch</h1>
          <p className={styles.heroSubtitle}>
            I'd love to hear from you! Whether you have questions about my books, coaching, or just want to connect.
          </p>
          <div className={styles.scrollIndicator}>
            <span>Scroll to connect</span>
            <div className={styles.scrollArrow}></div>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactContent}>
          {/* Contact Form */}
          <div className={styles.formContainer} data-aos="fade-right">
            <h2 className={styles.sectionTitle}>Send Me a Message</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {submitMessage && (
                <div className={`${styles.submitMessage} ${submitMessage.includes("error") ? styles.errorMessage : styles.successMessage}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Social Links and Info */}
          <div className={styles.infoContainer} data-aos="fade-left">
            <h2 className={styles.sectionTitle}>Connect With Me</h2>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📧</div>
                <div className={styles.contactDetails}>
                  <h3>Email</h3>
                  <p>contact@winifredfagbolagun.com</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📱</div>
                <div className={styles.contactDetails}>
                  <h3>Follow Me</h3>
                  <p>Stay updated with my latest work</p>
                </div>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/winifredfasuyi?igsh=Y21wZzNzM2EzejV3" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>📷</span>
                <span>Instagram</span>
              </a>
              
              {/* <a 
                href="#" 
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>📘</span>
                <span>Facebook</span>
              </a> */}
              
              {/* <a 
                href="#" 
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>🐦</span>
                <span>Twitter</span>
              </a> */}
            </div>

            <div className={styles.emailSignup}>
              <h3>Join Our Community</h3>
              <p>Subscribe to get updates on new books, resources, and encouragement for your journey.</p>
              <form className={styles.signupForm}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.signupButton}>Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;