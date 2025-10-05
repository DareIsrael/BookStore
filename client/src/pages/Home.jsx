// import React, { useEffect, useState } from "react";
// import styles from './Home.module.css';
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../services/api";





// const Home = () => {

   
//     const navigate = useNavigate();
//   // Sample testimonials data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah M.",
//       text: "These coloring books have been a blessing to our family. My children now recite biblical affirmations daily!",
//       role: "Mother of two"
//     },
//     {
//       id: 2,
//       name: "Michael T.",
//       text: "The A-Z Bible Names book made learning about biblical figures fun and engaging for my 5-year-old.",
//       role: "Children's Ministry Leader"
//     },
//     {
//       id: 3,
//       name: "Jennifer K.",
//       text: "Winifred's resources have transformed our bedtime routine into a meaningful faith-building experience.",
//       role: "Homeschool Parent"
//     }
//   ];


//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("/books");
//         setBooks(res.data);
//       } catch (err) {
//         console.error("Error fetching books:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

 


//   return (
//     <div className={styles.container}>
//       {/* Hero Section with Background Image */}
//       <section className={styles.hero}>
      
//         <div className={styles.heroContent}>
//           <h1 className={styles.headline}>
//             Here to inspire ambitious women of faith and show children their identity in Christ
//           </h1>
//           <p className={styles.subheadline}>
//             Through coaching and children's books, I'm here to walk with women in purpose and nurture kids to know their true identity in Christ
//           </p>
//           <button className={styles.ctaButton} onClick={() => navigate("/books")}
// >
//   Shop Now!
// </button>
//         </div>
//       </section>

//       {/* Intro Section */}
//       <section className={styles.introSection} >

//   <div className={styles.introContent}>
//     {/* Image on the left */}
//     <div className={styles.introImageContainer}>
//       <img  
//         src="https://res.cloudinary.com/dvntutcf4/image/upload/f_jpg/v1757511781/A1B78230-C871-407D-A416-9DCB6374AE92_xtch80.heic" 
//         alt="Winifred - Author and Coach" 
//         className={styles.introImage}
//       />
//     </div>
    
//     {/* Text content on the right */}
//     <div className={styles.introTextContent}>
//       <h2 className={styles.sectionTitle}>Meet Winifred</h2>
     
//       <div className={styles.introText}>
//         <p>
//           I'm Winifred — a mom to two little lights of the world, a Goal Coach for godly ambitious women, and the author of Christian kids' books that spread God's love and light.
//         </p>
//         <p>
//           As a volunteer kids' educator in church, I've seen firsthand how open little hearts are to God's truth. That's why I create resources that make Scripture fun, simple, and alive — helping every child see their true identity in Christ and supporting parents in raising faith-filled kids.
//         </p>
//         <p>
//           At the core, I'm just a woman who loves Jesus and wants to pass His light on to the next generation.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>
      
//       <section className={styles.productsSection}>
       
//       <div className={styles.productsContent}>
//         <h2 className={styles.sectionTitle}>Featured Products</h2>
//         <div className={styles.productsGrid}>
//           {books.map((book) => (
//             <div key={book._id} className={styles.productCard}>
//               {/* Book Cover Image */}
//               {book.coverImage && (
//                 <img
//                   src={book.coverImage}
//                   alt={book.name}
//                   className={styles.productImage}
//                 />
//               )}

//               <h3>{book.name}</h3>
//               <p>{book.description?.slice(0, 100)}...</p>
//               <Link to={`/books/${book._id}`} className={styles.previewLink}>
//                 View Details
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>

//       {/* Testimonials Section */}
//       <section className={styles.testimonialsSection}>
//         <div className={styles.testimonialsContent}>
//           <h2 className={styles.sectionTitle}>What Parents Are Saying</h2>
//           <div className={styles.testimonialsGrid}>
//             {testimonials.map(testimonial => (
//               <div key={testimonial.id} className={styles.testimonialCard}>
//                 <div className={styles.testimonialText}>"{testimonial.text}"</div>
//                 <div className={styles.testimonialAuthor}>
//                   <strong>{testimonial.name}</strong>
//                   <span>{testimonial.role}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Community CTA Section */}
//       <section className={styles.communitySection}>
//         <div className={styles.communityContent}>
//           <h2 className={styles.sectionTitle}>Join Our Community</h2>
//           <p className={styles.communityText}>
//             Join our community of parents raising Christ-centered children.
//           </p>
//           <form className={styles.signupForm}>
//             <input 
//               type="email" 
//               placeholder="Enter your email address" 
//               className={styles.emailInput}
//             />
//             <button type="submit" className={styles.signupButton}>Subscribe</button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



// import React, { useEffect, useState } from "react";
// import styles from './Home.module.css';
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../services/api";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Home = () => {

  
  
//    useEffect(() => {
//     AOS.init({
//       duration: 800, // animation duration in ms
//       once: true,    // animation only happens once
//     });
//   }, []);
//   const navigate = useNavigate();
  
//   // Sample testimonials data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah M.",
//       text: "These coloring books have been a blessing to our family. My children now recite biblical affirmations daily!",
//       role: "Mother of two"
//     },
//     {
//       id: 2,
//       name: "Michael T.",
//       text: "The A-Z Bible Names book made learning about biblical figures fun and engaging for my 5-year-old.",
//       role: "Children's Ministry Leader"
//     },
//     {
//       id: 3,
//       name: "Jennifer K.",
//       text: "Winifred's resources have transformed our bedtime routine into a meaningful faith-building experience.",
//       role: "Homeschool Parent"
//     }
//   ];

//   const [books, setBooks] = useState([]);
//   const [booksLoading, setBooksLoading] = useState(true); // Renamed to be specific
//   const [booksError, setBooksError] = useState(""); // Renamed to be specific

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("/books");
        
//         // Handle different response structures
//         if (Array.isArray(res.data)) {
//           setBooks(res.data);
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//           setBooks(res.data.data);
//         } else if (res.data.books && Array.isArray(res.data.books)) {
//           setBooks(res.data.books);
//         } else {
//           console.error("Unexpected API response structure:", res.data);
//           setBooks([]);
//         }
        
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setBooksError("Failed to load books. Please try again later.");
//         setBooks([]);
//       } finally {
//         setBooksLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* Hero Section with Background Image */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent}>
//           <h1 className={styles.headline}>
//             Here to inspire ambitious women of faith and show children their identity in Christ
//           </h1>
//           <p className={styles.subheadline}>
//             Through coaching and children's books, I'm here to walk with women in purpose and nurture kids to know their true identity in Christ
//           </p>
//           <button className={styles.ctaButton} onClick={() => navigate("/books")}>
//             Shop Now!
//           </button>
//         </div>
//       </section>

//       {/* Intro Section */}
//       <section className={styles.introSection}>
//         <div className={styles.introContent}>
//           {/* Image on the left */}
//           <div className={styles.introImageContainer}>
//             <img  data-aos="fade-up"
//               src="https://res.cloudinary.com/dvntutcf4/image/upload/f_jpg/v1757511781/A1B78230-C871-407D-A416-9DCB6374AE92_xtch80.heic" 
//               alt="Winifred - Author and Coach" 
//               className={styles.introImage}
//             />
//           </div>
          
//           {/* Text content on the right */}
//           <div data-aos="fade-right" className={styles.introTextContent}>
//             <h2 className={styles.sectionTitle} data-aos="fade-up">Meet <span>Winifred</span></h2>
//             <div className={styles.introText}>
//               <p>
//                 I'm Winifred — a mom to two little lights of the world, a Goal Coach for godly ambitious women, and the author of Christian kids' books that spread God's love and light.
//               </p>
//               <p>
//                 As a volunteer kids' educator in church, I've seen firsthand how open little hearts are to God's truth. That's why I create resources that make Scripture fun, simple, and alive — helping every child see their true identity in Christ and supporting parents in raising faith-filled kids.
//               </p>
//               <p>
//                 At the core, I'm just a woman who loves Jesus and wants to pass His light on to the next generation.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Products Section */}
//       <section className={styles.productsSection}>
//         <div className={styles.productsContent}>
//           <h2 className={styles.sectionTitle}>Featured Products</h2>
          
//           {booksLoading ? (
//             <div className={styles.loading}>Loading featured products...</div>
//           ) : booksError ? (
//             <div className={styles.error}>{booksError}</div>
//           ) : (
//             <div className={styles.productsGrid}>
//               {books.length === 0 ? (
//                 <div className={styles.noBooks}>
//                   <p>No books available at the moment.</p>
//                 </div>
//               ) : (
//                 books.map((book) => (
//                   <div key={book._id} className={styles.productCard}>
//                     {/* Book Cover Image */}
//                     {book.coverImage && (
//                       <img
//                         src={book.coverImage}
//                         alt={book.name}
//                         className={styles.productImage}
//                       />
//                     )}

//                     <h3>{book.name}</h3>
//                     <p>{book.description?.slice(0, 100)}...</p>
//                     <Link to={`/books/${book._id}`} className={styles.previewLink}>
//                       View Details
//                     </Link>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className={styles.testimonialsSection}>
//         <div data-aos="fade-down" className={styles.testimonialsContent}>
//           <h2 className={styles.sectionTitle}>What Parents Are Saying</h2>
//           <div className={styles.testimonialsGrid}>
//             {testimonials.map(testimonial => (
//               <div key={testimonial.id} className={styles.testimonialCard}>
//                 <div className={styles.testimonialText}>"{testimonial.text}"</div>
//                 <div className={styles.testimonialAuthor}>
//                   <strong>{testimonial.name}</strong>
//                   <span>{testimonial.role}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Community CTA Section */}
//       <section className={styles.communitySection}>
//         <div className={styles.communityContent}>
//           <h2 className={styles.sectionTitle}>Join Our Community</h2>
//           <p className={styles.communityText}>
//             Join our community of parents raising Christ-centered children.
//           </p>
//           <form className={styles.signupForm}>
//             <input 
//               type="email" 
//               placeholder="Enter your email address" 
//               className={styles.emailInput}
//             />
//             <button type="submit" className={styles.signupButton}>Subscribe</button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import styles from './Home.module.css';
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../services/api";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Home = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       easing: 'ease-out-cubic',
//       offset: 50
//     });
//   }, []);
  
//   const navigate = useNavigate();
  
//   // Sample testimonials data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah M.",
//       text: "These coloring books have been a blessing to our family. My children now recite biblical affirmations daily!",
//       role: "Mother of two"
//     },
//     {
//       id: 2,
//       name: "Michael T.",
//       text: "The A-Z Bible Names book made learning about biblical figures fun and engaging for my 5-year-old.",
//       role: "Children's Ministry Leader"
//     },
//     {
//       id: 3,
//       name: "Jennifer K.",
//       text: "Winifred's resources have transformed our bedtime routine into a meaningful faith-building experience.",
//       role: "Homeschool Parent"
//     }
//   ];

//   const [books, setBooks] = useState([]);
//   const [booksLoading, setBooksLoading] = useState(true);
//   const [booksError, setBooksError] = useState("");
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("/books");
        
//         // Handle different response structures
//         if (Array.isArray(res.data)) {
//           setBooks(res.data);
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//           setBooks(res.data.data);
//         } else if (res.data.books && Array.isArray(res.data.books)) {
//           setBooks(res.data.books);
//         } else {
//           console.error("Unexpected API response structure:", res.data);
//           setBooks([]);
//         }
        
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setBooksError("Failed to load books. Please try again later.");
//         setBooks([]);
//       } finally {
//         setBooksLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email && /\S+@\S+\.\S+/.test(email)) {
//       // Here you would typically send the email to your backend
//       console.log("Subscribed with email:", email);
//       setSubscribed(true);
//       setEmail("");
      
//       // Reset after 3 seconds
//       setTimeout(() => {
//         setSubscribed(false);
//       }, 3000);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Hero Section with Background Image */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent} data-aos="fade-up">
//           <h1 className={styles.headline}>
//             Inspiring ambitious women of faith and showing children their identity in Christ
//           </h1>
//           <p className={styles.subheadline}>
//             Through coaching and children's books, I'm here to walk with women in purpose and nurture kids to know their true identity in Christ
//           </p>
//           <button className={styles.ctaButton} onClick={() => navigate("/books")}>
//             Shop Now!
//           </button>
//         </div>
        
//         {/* Scroll indicator */}
//         <div className={styles.scrollIndicator}>
//           <span>Scroll to explore</span>
//           <div className={styles.scrollArrow}></div>
//         </div>
//       </section>

//       {/* Intro Section */}
//       <section className={styles.introSection}>
//         <div className={styles.introContent}>
//           {/* Image on the left */}
//           <div className={styles.introImageContainer} data-aos="fade-right">
//             <img 
//               src="https://res.cloudinary.com/dvntutcf4/image/upload/f_jpg/v1757511781/A1B78230-C871-407D-A416-9DCB6374AE92_xtch80.heic" 
//               alt="Winifred - Author and Coach" 
//               className={styles.introImage}
//             />
//           </div>
          
//           {/* Text content on the right */}
//           <div className={styles.introTextContent} data-aos="fade-left">
//             <h2 className={styles.sectionTitle}>Meet <span>Winifred</span></h2>
//             <hr></hr>
//             <div className={styles.introText}>
//               <p>
//                 I'm Winifred — a wife, a mom to two little lights of the world, a Goal Coach for godly ambitious women, and the author of Christian kids' books that spread God's love and light.
//               </p>
//               <p>
//                 As a volunteer kids' educator in church, I've seen firsthand how open little hearts are to God's truth. That's why I create resources that make Scripture fun, simple, and alive — helping every child see their true identity in Christ and supporting parents in raising faith-filled kids.
//               </p>
//               <p>
//                 At the core, I'm just a woman who loves Jesus and wants to pass His light on to the next generation.
//               </p>
//             </div>
            
//             {/* <div className={styles.signature}>
//               <img src="https://res.cloudinary.com/dvntutcf4/image/upload/v1757511781/signature_xtch80.png" alt="Winifred's Signature" />
//             </div> */}
//           </div>
//         </div>
//       </section>
      
//       {/* Products Section */}
//       <section className={styles.productsSection} id="products">
//         <div className={styles.productsContent}>
//           <h2 className={styles.sectionTitle} data-aos="fade-up">Featured Products</h2>
//           <p className={styles.sectionSubtitleLine}></p>
//           <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
//             Discover our collection of faith-building resources for children
//           </p>
          
//           {booksLoading ? (
//             <div className={styles.loadingContainer} data-aos="fade-in">
//               <div className={styles.loadingSpinner}></div>
//               <p>Loading featured products...</p>
//             </div>
//           ) : booksError ? (
//             <div className={styles.error} data-aos="fade-in">
//               <p>{booksError}</p>
//               <button onClick={() => window.location.reload()} className={styles.retryButton}>
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <div className={styles.productsGrid}>
//               {books.length === 0 ? (
//                 <div className={styles.noBooks} data-aos="fade-in">
//                   <p>No books available at the moment. Check back soon!</p>
//                 </div>
//               ) : (
//                 books.map((book, index) => (
//                   <div 
//                     key={book._id} 
//                     className={styles.productCard}
//                     data-aos="fade-up"
//                     data-aos-delay={index * 100}
//                   >
//                     {/* Book Cover Image */}
//                     {book.coverImage && (
//                       <div className={styles.productImageContainer}>
//                         <img
//                           src={book.coverImage}
//                           alt={book.name}
//                           className={styles.productImage}
//                         />
//                         <div className={styles.productOverlay}>
//                           <Link to={`/books/${book._id}`} className={styles.viewDetailsBtn}>
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     )}

//                     <div className={styles.productInfo}>
//                       <h3>{book.name}</h3>
//                       <p className={styles.productDescription}>{book.description?.slice(0, 100)}...</p>
//                       <div className={styles.productActions}>
//                         <span className={styles.productPrice}>${book.price || '19.99'}</span>
//                         <Link to={`/books/${book._id}`} className={styles.previewLink}>
//                           Preview
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className={styles.testimonialsSection}>
//         <div className={styles.testimonialsContent}>
//           <h2 className={styles.sectionTitle} data-aos="fade-up">What Parents Are Saying</h2>
//           <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
//             Hear from families who have used our resources
//           </p>
//           <div className={styles.testimonialsGrid}>
//             {testimonials.map((testimonial, index) => (
//               <div 
//                 key={testimonial.id} 
//                 className={styles.testimonialCard}
//                 data-aos="fade-up"
//                 data-aos-delay={index * 150}
//               >
//                 <div className={styles.testimonialIcon}>❝</div>
//                 <div className={styles.testimonialText}>"{testimonial.text}"</div>
//                 <div className={styles.testimonialAuthor}>
//                   <strong>{testimonial.name}</strong>
//                   <span>{testimonial.role}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Community CTA Section */}
//       <section className={styles.communitySection}>
//         <div className={styles.communityContent}>
//           <h2 className={styles.sectionTitle} data-aos="fade-up">Join Our Community</h2>
//           <p className={styles.communityText} data-aos="fade-up" data-aos-delay="100">
//             Join our community of parents raising Christ-centered children.
//           </p>
          
//           {subscribed ? (
//             <div className={styles.successMessage} data-aos="fade-in">
//               Thank you for subscribing! Check your email for confirmation.
//             </div>
//           ) : (
//             <form className={styles.signupForm} onSubmit={handleSubscribe} data-aos="fade-up" data-aos-delay="200">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email address" 
//                 className={styles.emailInput}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit" className={styles.signupButton}>Subscribe</button>
//             </form>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect, useState } from "react";
// import styles from './Home.module.css';
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../services/api";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Home = () => {
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       easing: 'ease-out-cubic',
//       offset: 50
//     });
//   }, []);
  
//   const navigate = useNavigate();
  
//   // Sample testimonials data
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah M.",
//       text: "These coloring books have been a blessing to our family. My children now recite biblical affirmations daily!",
//       role: "Mother of two"
//     },
//     {
//       id: 2,
//       name: "Michael T.",
//       text: "The A-Z Bible Names book made learning about biblical figures fun and engaging for my 5-year-old.",
//       role: "Children's Ministry Leader"
//     },
//     {
//       id: 3,
//       name: "Jennifer K.",
//       text: "Winifred's resources have transformed our bedtime routine into a meaningful faith-building experience.",
//       role: "Homeschool Parent"
//     }
//   ];

//   const [books, setBooks] = useState([]);
//   const [booksLoading, setBooksLoading] = useState(true);
//   const [booksError, setBooksError] = useState("");
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const res = await axios.get("/books");
        
//         // Handle different response structures
//         if (Array.isArray(res.data)) {
//           setBooks(res.data);
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//           setBooks(res.data.data);
//         } else if (res.data.books && Array.isArray(res.data.books)) {
//           setBooks(res.data.books);
//         } else {
//           console.error("Unexpected API response structure:", res.data);
//           setBooks([]);
//         }
        
//       } catch (err) {
//         console.error("Error fetching books:", err);
//         setBooksError("Failed to load books. Please try again later.");
//         setBooks([]);
//       } finally {
//         setBooksLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email && /\S+@\S+\.\S+/.test(email)) {
//       // Here you would typically send the email to your backend
//       console.log("Subscribed with email:", email);
//       setSubscribed(true);
//       setEmail("");
      
//       // Reset after 3 seconds
//       setTimeout(() => {
//         setSubscribed(false);
//       }, 3000);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       {/* Hero Section with Background Image */}
//       <section className={styles.hero}>
//         <div className={styles.heroContent} data-aos="fade-up">
//           <h1 className={styles.headline}>
//             Inspiring ambitious women of faith and showing children their identity in Christ
//           </h1>
//           <p className={styles.subheadline}>
//             Through coaching and children's books, I'm here to walk with women in purpose and nurture kids to know their true identity in Christ
//           </p>
//           <button className={styles.ctaButton} onClick={() => navigate("/books")}>
//             Shop Now!
//           </button>
//         </div>
        
//         {/* Scroll indicator */}
//         <div className={styles.scrollIndicator}>
//           <span>Scroll to explore</span>
//           <div className={styles.scrollArrow}></div>
//         </div>
//       </section>

//       {/* Intro Section */}
//       <section className={styles.introSection}>
//         <div className={styles.introContent}>
//           {/* Image on the left */}
//           <div className={styles.introImageContainer} data-aos="fade-right">
//             <img 
//               src="https://res.cloudinary.com/dvntutcf4/image/upload/f_jpg/v1757511781/A1B78230-C871-407D-A416-9DCB6374AE92_xtch80.heic" 
//               alt="Winifred - Author and Coach" 
//               className={styles.introImage}
//             />
//           </div>
          
//           {/* Text content on the right */}
//           <div className={styles.introTextContent} data-aos="fade-left">
//             <h2 className={styles.sectionTitle}>Meet <span>Winifred</span></h2>
//             <hr></hr>
//             <div className={styles.introText}>
//              <p>
//                Hi, I’m Winifred — a wife, mom to two little lights of the world, and a Goal Coach for godly ambitious women. I help women gain clarity, build belief, and create structure that fits their real life, so they can align with purpose and achieve their goals with grace.
//              </p> 
//              <p>
//               Alongside coaching, I also create Christ-centered books and resources that help children discover their identity in Christ — a passion born from years of serving as a volunteer kids’ educator in church.
//              </p>
//               <p>
//                 At my core, I’m a woman who loves Jesus, loves people, and believes in equipping women and children to shine as lights in the world.
//               </p>
//             </div>
            
//             {/* Action Buttons */}
//             <div className={styles.actionButtons} data-aos="fade-up" data-aos-delay="200">
//               <Link to="/videos" className={styles.goldButton}>
//                 Explore Coaching
//               </Link>
//               <Link to="/books" className={styles.whiteButton}>
//                 Browse Books
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Rest of your component remains the same */}
//       {/* Products Section */}
//       <section className={styles.productsSection} id="products">
//         <div className={styles.productsContent}>
//           <h2 className={styles.sectionTitle} data-aos="fade-up">Featured Products</h2>
//           <p className={styles.sectionSubtitleLine}></p>
//           <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
//             Discover our collection of faith-building resources for children
//           </p>
          
//           {booksLoading ? (
//             <div className={styles.loadingContainer} data-aos="fade-in">
//               <div className={styles.loadingSpinner}></div>
//               <p>Loading featured products...</p>
//             </div>
//           ) : booksError ? (
//             <div className={styles.error} data-aos="fade-in">
//               <p>{booksError}</p>
//               <button onClick={() => window.location.reload()} className={styles.retryButton}>
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <div className={styles.productsGrid}>
//               {books.length === 0 ? (
//                 <div className={styles.noBooks} data-aos="fade-in">
//                   <p>No books available at the moment. Check back soon!</p>
//                 </div>
//               ) : (
//                 books.map((book, index) => (
//                   <div 
//                     key={book._id} 
//                     className={styles.productCard}
//                     data-aos="fade-up"
//                     data-aos-delay={index * 100}
//                   >
//                     {/* Book Cover Image */}
//                     {book.coverImage && (
//                       <div className={styles.productImageContainer}>
//                         <img
//                           src={book.coverImage}
//                           alt={book.name}
//                           className={styles.productImage}
//                         />
//                         <div className={styles.productOverlay}>
//                           <Link to={`/books/${book._id}`} className={styles.viewDetailsBtn}>
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     )}

//                     <div className={styles.productInfo}>
//                       <h3>{book.name}</h3>
//                       <p className={styles.productDescription}>{book.description?.slice(0, 100)}...</p>
//                       <div className={styles.productActions}>
//                         <span className={styles.productPrice}>£{book.price}</span>
//                         <Link to={`/books/${book._id}`} className={styles.previewLink}>
//                           Preview
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className={styles.testimonialsSection}>
//         <div className={styles.testimonialsContent}>
//           <h2 className={styles.sectionTitle} data-aos="fade-up">What Parents Are Saying</h2>
//           <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
//             Hear from families who have used our resources
//           </p>
//           <div className={styles.testimonialsGrid}>
//             {testimonials.map((testimonial, index) => (
//               <div 
//                 key={testimonial.id} 
//                 className={styles.testimonialCard}
//                 data-aos="fade-up"
//                 data-aos-delay={index * 150}
//               >
//                 <div className={styles.testimonialIcon}>❝</div>
//                 <div className={styles.testimonialText}>"{testimonial.text}"</div>
//                 <div className={styles.testimonialAuthor}>
//                   <strong>{testimonial.name}</strong>
//                   <span>{testimonial.role}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Community CTA Section */}
//       <section className={styles.communitySection}>
//         <div className={styles.communityContent}>
//           <h2 className={styles.sectionTitle} data-aos="fade-up">Join Our Community</h2>
//           <p className={styles.communityText} data-aos="fade-up" data-aos-delay="100">
//             Join our community of parents raising Christ-centered children.
//           </p>
          
//           {subscribed ? (
//             <div className={styles.successMessage} data-aos="fade-in">
//               Thank you for subscribing! Check your email for confirmation.
//             </div>
//           ) : (
//             <form className={styles.signupForm} onSubmit={handleSubscribe} data-aos="fade-up" data-aos-delay="200">
//               <input 
//                 type="email" 
//                 placeholder="Enter your email address" 
//                 className={styles.emailInput}
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <button type="submit" className={styles.signupButton}>Subscribe</button>
//             </form>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from "react";
import styles from './Home.module.css';
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/api";
import AOS from "aos";
import "aos/dist/aos.css";
import VideoCard from "../components/VideoCard"; // Import your VideoCard component

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 50
    });
  }, []);
  
  const navigate = useNavigate();
  
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      text: "These coloring books have been a blessing to our family. My children now recite biblical affirmations daily!",
      role: "Mother of two"
    },
    {
      id: 2,
      name: "Michael T.",
      text: "The A-Z Bible Names book made learning about biblical figures fun and engaging for my 5-year-old.",
      role: "Children's Ministry Leader"
    },
    {
      id: 3,
      name: "Jennifer K.",
      text: "Winifred's resources have transformed our bedtime routine into a meaningful faith-building experience.",
      role: "Homeschool Parent"
    },
    {
    id: 4,
    name: "Jessica Reynolds",
    text: "Working with Winifred transformed how I approach my goals. Her coaching helped me gain clarity about my purpose and create a practical structure that actually works with my busy life as a working mom. I've never felt more aligned!",
    role: "Marketing Director & Mom of 3"
  },
  {
    id: 5,
    name: "Amanda Chen",
    text: "The clarity I gained from just one coaching session was incredible. Winifred has a gift for helping you see what truly matters and then giving you the tools to make it happen. My business and family life are both thriving now!",
    role: "Entrepreneur & Ministry Leader"
  },
  {
    id: 6,
    name: "Danielle Roberts",
    text: "I was stuck for years trying to balance my career ambitions with my faith. Winifred's coaching gave me the belief and practical strategy to move forward with confidence. She helped me see that I don't have to choose between success and serving God.",
    role: "Nonprofit Founder"
  }
  ];

  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(true);
  const [booksError, setBooksError] = useState("");
  const [videosError, setVideosError] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("/books");
        
        // Handle different response structures
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (res.data.data && Array.isArray(res.data.data)) {
          setBooks(res.data.data);
        } else if (res.data.books && Array.isArray(res.data.books)) {
          setBooks(res.data.books);
        } else {
          console.error("Unexpected API response structure:", res.data);
          setBooks([]);
        }
        
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooksError("Failed to load books. Please try again later.");
        setBooks([]);
      } finally {
        setBooksLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Fetch videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/videos");
        console.log("Videos API response:", res.data);
        
        // Handle different response structures for videos
        const videosData = res.data.data || res.data || [];
        setVideos(Array.isArray(videosData) ? videosData : []);
        
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideosError("Failed to load coaching sessions. Please try again later.");
        setVideos([]);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      // Here you would typically send the email to your backend
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  const isLoading = booksLoading || videosLoading;
  const hasError = booksError || videosError;

  return (
    <div className={styles.container}>
      {/* Hero Section with Background Image */}
      <section className={styles.hero}>
        <div className={styles.heroContent} data-aos="fade-up">
          <h1 className={styles.headline}>
            Inspiring ambitious women of faith and showing children their identity in Christ
          </h1>
          <p className={styles.subheadline}>
            Through coaching and children's books, I'm here to walk with women in purpose and nurture kids to know their true identity in Christ
          </p>
          <button className={styles.ctaButton} onClick={() => navigate("/books")}>
            Shop Now!
          </button>
        </div>
        
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <span>Scroll to explore</span>
          <div className={styles.scrollArrow}></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          {/* Image on the left */}
          <div className={styles.introImageContainer} data-aos="fade-right">
            <img 
              src="https://res.cloudinary.com/dvntutcf4/image/upload/f_jpg/v1757511781/A1B78230-C871-407D-A416-9DCB6374AE92_xtch80.heic" 
              alt="Winifred - Author and Coach" 
              className={styles.introImage}
            />
          </div>
          
          {/* Text content on the right */}
          <div className={styles.introTextContent} data-aos="fade-left">
            <h2 className={styles.sectionTitle}>Meet <span>Winifred</span></h2>
            <hr ></hr>
            <div className={styles.introText}>
             <p>
               Hi, I'm Winifred — a wife, mom to two little lights of the world, and a Goal Coach for godly ambitious women. I help women gain clarity, build belief, and create structure that fits their real life, so they can align with purpose and achieve their goals with grace.
             </p> 
             <p>
              Alongside coaching, I also create Christ-centered books and resources that help children discover their identity in Christ — a passion born from years of serving as a volunteer kids' educator in church.
             </p>
              <p>
                At my core, I'm a woman who loves Jesus, loves people, and believes in equipping women and children to shine as lights in the world.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className={styles.actionButtons} data-aos="fade-up" data-aos-delay="200">
              <Link to="/videos" className={styles.goldButton}>
                Explore Coaching
              </Link>
              <Link to="/books" className={styles.whiteButton}>
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className={styles.productsSection} id="products">
        <div className={styles.productsContent}>
         
          <h2 className={styles.sectionTitle} data-aos="fade-up">Featured Products</h2>
          <hr className={styles.goldDivider}></hr>
          <p className={styles.sectionSubtitleLine}></p>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
            Discover our collection of coaching sessions and faith-building resources
          </p>
          
          {isLoading ? (
            <div className={styles.loadingContainer} data-aos="fade-in">
              <div className={styles.loadingSpinner}></div>
              <p>Loading featured products...</p>
            </div>
          ) : hasError ? (
            <div className={styles.error} data-aos="fade-in">
              <p>{booksError || videosError}</p>
              <button onClick={() => window.location.reload()} className={styles.retryButton}>
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Videos Section */}
              {videos.length > 0 && (
                <div className={styles.categorySection} data-aos="fade-up">
                  {/* <h3 className={styles.categoryTitle}>Coaching Sessions</h3>
                  <p className={styles.categoryDescription}>
                    Transformative coaching to help you gain clarity and align with purpose
                  </p> */}
                  <div className={styles.productsGrid}>
                    {videos.map((video, index) => (
                      <VideoCard 
                        key={video._id} 
                        video={video}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Books Section */}
              {books.length > 0 && (
                <div className={styles.categorySection} data-aos="fade-up" data-aos-delay="200">
                  <h3 className={styles.categoryTitle}>Books & Resources</h3>
                  <hr className={styles.goldDivider}></hr>
                  <p className={styles.categoryDescription}>
                    Christ-centered books and resources for children and families
                  </p>
                  <div className={styles.productsGrid}>
                    {books.map((book, index) => (
                      <div 
                        key={book._id} 
                        className={styles.productCard}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        {/* Book Cover Image */}
                        {book.coverImage && (
                          <div className={styles.productImageContainer}>
                            <img
                              src={book.coverImage}
                              alt={book.name}
                              className={styles.productImage}
                            />
                            <div className={styles.productOverlay}>
                              <Link to={`/books/${book._id}`} className={styles.viewDetailsBtn}>
                                View Details
                              </Link>
                            </div>
                          </div>
                        )}

                        <div className={styles.productInfo}>
                          <h3>{book.name}</h3>
                          <p className={styles.productDescription}>{book.description?.slice(0, 100)}...</p>
                          <div className={styles.productActions}>
                            <span className={styles.productPrice}>£{book.price}</span>
                            <Link to={`/books/${book._id}`} className={styles.previewLink}>
                              Preview
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {videos.length === 0 && books.length === 0 && (
                <div className={styles.noBooks} data-aos="fade-in">
                  <p>No products available at the moment. Check back soon!</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContent}>
          <h2 className={styles.sectionTitle} data-aos="fade-up">What Parents Are Saying</h2>
           <hr className={styles.goldDivider}></hr>
          <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
            Hear from families who have used our resources
          </p>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={styles.testimonialCard}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className={styles.testimonialIcon}>❝</div>
                <div className={styles.testimonialText}>"{testimonial.text}"</div>
                <div className={styles.testimonialAuthor}>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className={styles.communitySection}>
        <div className={styles.communityContent}>
          <h2 className={styles.sectionTitle} data-aos="fade-up">Join Our Community</h2>
          <p className={styles.communityText} data-aos="fade-up" data-aos-delay="100">
            Join our community of parents raising Christ-centered children.
          </p>
          
          {subscribed ? (
            <div className={styles.successMessage} data-aos="fade-in">
              Thank you for subscribing! Check your email for confirmation.
            </div>
          ) : (
            <form className={styles.signupForm} onSubmit={handleSubscribe} data-aos="fade-up" data-aos-delay="200">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.signupButton}>Subscribe</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;