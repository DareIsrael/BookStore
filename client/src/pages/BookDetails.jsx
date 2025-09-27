// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     axios.get(`api/books/${id}`).then(res => setBook(res.data));
//   }, [id]);

//   if (!book) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{book.name}</h1>
//       <p>{book.description}</p>
//       {book && <CheckoutButton item={book} />}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     axios.get(`api/books/${id}`).then(res => setBook(res.data));
//   }, [id]);

//   if (!book) return <div className={styles.loading}>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>{book.name}</h1>
//       <p className={styles.description}>{book.description}</p>
//       <div className={styles.buttonContainer}>
//         {book && <CheckoutButton item={book} />}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     axios.get(`api/books/${id}`).then(res => setBook(res.data));
//   }, [id]);

//   if (!book) return <div className={styles.loading}>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       {/* Book Cover Image */}
//       {book.coverImage && (
//         <img
//           src={book.coverImage}
//           alt={book.name}
//           className={styles.coverImage}
//         />
//       )}

//       {/* Book Info */}
//       <h1 className={styles.title}>{book.name}</h1>
//       <p className={styles.author}><strong>Author:</strong> {book.author}</p>
//       <p className={styles.description}>{book.description}</p>
//       <p className={styles.price}>
//         <strong>Price:</strong> ${book.price} {book.currency.toUpperCase()}
//       </p>

//       {/* Checkout Button */}
//       <div className={styles.buttonContainer}>
//         <CheckoutButton item={book} />
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     axios.get(`/books/${id}`).then(res => setBook(res.data.data));
//   }, [id]);

//   if (!book) return <div className={styles.loading}>Loading...</div>;

//   return (
//     <div className={styles.container}>
//       {/* Book Cover Image - Left Side */}
//       {book.coverImage && (
//         <img
//           src={book.coverImage}
//           alt={book.name}
//           className={styles.coverImage}
//         />
//       )}

//       {/* Book Info - Right Side */}
//       <div className={styles.infoContainer}>
//         <h1 className={styles.title}>{book.name}</h1>
//         <p className={styles.author}><strong>Author:</strong> {book.author}</p>
//         <p className={styles.description}>{book.description}</p>
        
//         {/* Price and Button side by side */}
//         <div className={styles.priceContainer}>
//           <p className={styles.price}>
//             <strong>Price:</strong> ${book.price} {book.currency.toUpperCase()}
//           </p>
//           <div className={styles.buttonContainer}>
//             <CheckoutButton item={book} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // if (!isOpen) return null;

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: 'ease-out-cubic'
//     });
//   }, []);
 
//   useEffect(() => {
//     setLoading(true);
//     axios.get(`/books/${id}`)
//       .then(res => {
//         setBook(res.data.data || res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching book:", err);
//         setError("Failed to load book details. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading book details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.errorIcon}>⚠️</div>
//         <h3>Oops! Something went wrong</h3>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()} 
//           className={styles.retryButton}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!book) {
//     return (
//       <div className={styles.notFoundContainer}>
//         <div className={styles.notFoundIcon}>📚</div>
//         <h3>Book Not Found</h3>
//         <p>The book you're looking for doesn't exist or has been removed.</p>
//         <a href="/books" className={styles.browseButton}>
//           Browse All Books
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* Breadcrumb Navigation */}
//       <nav className={styles.breadcrumb} data-aos="fade-down">
//         <a href="/">Home</a>
//         <span> / </span>
//         <a href="/books">Books</a>
//         <span> / </span>
//         <span>{book.name}</span>
//       </nav>

//       <div className={styles.content}>
//         {/* Book Cover Image - Left Side */}
//         <div className={styles.imageSection} data-aos="fade-right">
//           <div className={styles.imageContainer}>
//             {book.coverImage && (
//               <img
//                 src={book.coverImage}
//                 alt={book.name}
//                 className={styles.coverImage}
//               />
//             )}
//             <div className={styles.imageOverlay}>
//               <span className={styles.bestsellerBadge}>Bestseller</span>
//             </div>
//           </div>
          
//         </div>

//         {/* Book Info - Right Side */}
//         <div className={styles.infoContainer} data-aos="fade-left">
//           <div className={styles.bookHeader}>
//             <h1 className={styles.title}>{book.name}</h1>
//             <p className={styles.author}>
//               By <span className={styles.authorName}>{book.author || "Winifred"}</span>
//             </p>
            
//             {/* Ratings */}
//             <div className={styles.ratings}>
//               <div className={styles.stars}>
//                 {"★".repeat(5)}
//                 <span className={styles.ratingText}>(4.8/5)</span>
//               </div>
//               <span className={styles.reviewCount}>128 reviews</span>
//             </div>
//           </div>

//           <div className={styles.descriptionSection}>
//             <h3 className={styles.sectionTitle}>About This Book</h3>
//             <p className={styles.description}>{book.description}</p>
//           </div>

//           {/* Features */}
//           <div className={styles.features}>
//             <h3 className={styles.sectionTitle}>What You'll Get</h3>
//             <ul className={styles.featuresList}>
//               <li>Beautiful, faith-inspired illustrations</li>
//               <li>Biblical affirmations and scriptures</li>
//               <li>High-quality paper perfect for coloring</li>
//               <li>Age-appropriate content for children</li>
//               <li>Digital bonus content with purchase</li>
//             </ul>
//           </div>

//           {/* Price and Button Container */}
//           <div className={styles.priceContainer}>
//             <div className={styles.priceInfo}>
//               <p className={styles.price}>
//                 ${book.price} <span className={styles.currency}>{book.currency?.toUpperCase()}</span>
//               </p>
//               <p className={styles.shipping}>Free shipping • 30-day guarantee</p>
//             </div>
            
//             <div className={styles.buttonContainer}>
//               <CheckoutButton item={book} className={styles.checkoutButton} />
//               {/* <button className={styles.wishlistButton}>
//                 ♡ Add to Wishlist
//               </button> */}
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className={styles.additionalInfo}>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>📦</span>
//               <span>Usually ships within 24 hours</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>🎁</span>
//               <span>Perfect gift for children ages 3-10</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>✉️</span>
//               <span>Free digital version included</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Related Books Section */}
//       <section className={styles.relatedSection}>
//         {/* <h2 className={styles.relatedTitle}>You Might Also Like</h2>
//         <div className={styles.relatedBooks}> */}
//           {/* These would be populated with actual related books data */}
//           {/* <div className={styles.relatedBook}></div>
//           <div className={styles.relatedBook}></div>
//           <div className={styles.relatedBook}></div>
//         </div> */}
//       </section>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: 'ease-out-cubic'
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`/books/${id}`)
//       .then(res => {
//         setBook(res.data.data || res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching book:", err);
//         setError("Failed to load book details. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading book details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.errorIcon}>⚠️</div>
//         <h3>Oops! Something went wrong</h3>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()} 
//           className={styles.retryButton}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!book) {
//     return (
//       <div className={styles.notFoundContainer}>
//         <div className={styles.notFoundIcon}>📚</div>
//         <h3>Book Not Found</h3>
//         <p>The book you're looking for doesn't exist or has been removed.</p>
//         <a href="/books" className={styles.browseButton}>
//           Browse All Books
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       {/* Breadcrumb Navigation */}
//       <nav className={styles.breadcrumb} data-aos="fade-down">
//         <a href="/">Home</a>
//         <span> / </span>
//         <a href="/books">Books</a>
//         <span> / </span>
//         <span>{book.name}</span>
//       </nav>

//       <div className={styles.content}>
//         {/* Book Cover Image - Left Side */}
//         <div className={styles.imageSection} data-aos="fade-right">
//           <div className={styles.imageContainer}>
//             {book.coverImage && (
//               <img
//                 src={book.coverImage}
//                 alt={book.name}
//                 className={styles.coverImage}
//               />
//             )}
//             <div className={styles.imageOverlay}>
//               <span className={styles.bestsellerBadge}>Bestseller</span>
//             </div>
//           </div>
//         </div>

//         {/* Book Info - Right Side */}
//         <div className={styles.infoContainer} data-aos="fade-left">
//           <div className={styles.bookHeader}>
//             <h1 className={styles.title}>{book.name}</h1>
//             <p className={styles.author}>
//               By <span className={styles.authorName}>{book.author || "Winifred"}</span>
//             </p>
            
//             {/* Ratings */}
//             <div className={styles.ratings}>
//               <div className={styles.stars}>
//                 {"★".repeat(5)}
//                 <span className={styles.ratingText}>(4.8/5)</span>
//               </div>
//               <span className={styles.reviewCount}>128 reviews</span>
//             </div>
//           </div>

//           <div className={styles.descriptionSection}>
//             <h3 className={styles.sectionTitle}>About This Book</h3>
//             <p className={styles.description}>{book.description}</p>
//           </div>

//           {/* Features */}
//           <div className={styles.features}>
//             <h3 className={styles.sectionTitle}>What You'll Get</h3>
//             <ul className={styles.featuresList}>
//               <li>Beautiful, faith-inspired illustrations</li>
//               <li>Biblical affirmations and scriptures</li>
//               <li>High-quality paper perfect for coloring</li>
//               <li>Age-appropriate content for children</li>
//               <li>Digital bonus content with purchase</li>
//             </ul>
//           </div>

//           {/* Price and Button Container */}
//           <div className={styles.priceContainer}>
//             <div className={styles.priceInfo}>
//               <p className={styles.price}>
//                 ${book.price} <span className={styles.currency}>{book.currency?.toUpperCase()}</span>
//               </p>
//               <p className={styles.shipping}>Free shipping • 30-day guarantee</p>
//             </div>
            
//             <div className={styles.buttonContainer}>
//               <CheckoutButton item={book} className={styles.checkoutButton} />
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className={styles.additionalInfo}>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>📦</span>
//               <span>Usually ships within 24 hours</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>🎁</span>
//               <span>Perfect gift for children ages 3-10</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>✉️</span>
//               <span>Free digital version included</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ReactDOM from "react-dom";

// // Create a portal component
// const ModalPortal = ({ children }) => {
//   const modalRoot = document.getElementById("modal-root");
  
//   // Create a div for the portal if it doesn't exist
//   if (!modalRoot) {
//     const newModalRoot = document.createElement("div");
//     newModalRoot.id = "modal-root";
//     document.body.appendChild(newModalRoot);
//     return ReactDOM.createPortal(children, newModalRoot);
//   }
  
//   return ReactDOM.createPortal(children, modalRoot);
// };

// export default function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currencySign, setCurrencySign] = useState()

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: 'ease-out-cubic'
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`/books/${id}`)
//       .then(res => {
//         setBook(res.data.data || res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching book:", err);
//         setError("Failed to load book details. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading book details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.errorIcon}>⚠️</div>
//         <h3>Oops! Something went wrong</h3>
//         <p>{error}</p>
//         <button 
//           onClick={() => window.location.reload()} 
//           className={styles.retryButton}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!book) {
//     return (
//       <div className={styles.notFoundContainer}>
//         <div className={styles.notFoundIcon}>📚</div>
//         <h3>Book Not Found</h3>
//         <p>The book you're looking for doesn't exist or has been removed.</p>
//         <a href="/books" className={styles.browseButton}>
//           Browse All Books
//         </a>
//       </div>
//     );
//   }

//   console.log(book.currency)
//   if (book.currency === usd) {
//     setCurrencySign("$")
//   } if (book.currency === gbp) {
//     setCurrencySign("£")
    
//   } if (book.currency=== eur ) {
//     setCurrencySign("€")
//   } else if (book.currency=== cad ) {
//     setCurrencySign("CA$")
//   }

//   return (
//     <div className={styles.container}>
//       {/* Breadcrumb Navigation */}
//       <nav className={styles.breadcrumb} data-aos="fade-down">
//         <a href="/">Home</a>
//         <span> / </span>
//         <a href="/books">Books</a>
//         <span> / </span>
//         <span>{book.name}</span>
//       </nav>

//       <div className={styles.content}>
//         {/* Book Cover Image - Left Side */}
//         <div className={styles.imageSection} data-aos="fade-right">
//           <div className={styles.imageContainer}>
//             {book.coverImage && (
//               <img
//                 src={book.coverImage}
//                 alt={book.name}
//                 className={styles.coverImage}
//               />
//             )}
//             <div className={styles.imageOverlay}>
//               <span className={styles.bestsellerBadge}>Bestseller</span>
//             </div>
//           </div>
//         </div>

//         {/* Book Info - Right Side */}
//         <div className={styles.infoContainer} data-aos="fade-left">
//           <div className={styles.bookHeader}>
//             <h1 className={styles.title}>{book.name}</h1>
//             <p className={styles.author}>
//               By <span className={styles.authorName}>{book.author || "Winifred"}</span>
//             </p>
            
//             {/* Ratings */}
//             <div className={styles.ratings}>
//               <div className={styles.stars}>
//                 {"★".repeat(5)}
//                 <span className={styles.ratingText}>(4.8/5)</span>
//               </div>
//               <span className={styles.reviewCount}>128 reviews</span>
//             </div>
//           </div>

//           <div className={styles.descriptionSection}>
//             <h3 className={styles.sectionTitle}>About This Book</h3>
//             <p className={styles.description}>{book.description}</p>
//           </div>

//           {/* Features */}
//           <div className={styles.features}>
//             <h3 className={styles.sectionTitle}>What You'll Get</h3>
//             <ul className={styles.featuresList}>
//               <li>Beautiful, faith-inspired illustrations</li>
//               <li>Biblical affirmations and scriptures</li>
//               <li>High-quality paper perfect for coloring</li>
//               <li>Age-appropriate content for children</li>
//               <li>Digital bonus content with purchase</li>
//             </ul>
//           </div>

//           {/* Price and Button Container */}
//           <div className={styles.priceContainer}>
//             <div className={styles.priceInfo}>
//               <p className={styles.price}>
//                 {currencySign}{book.price} <span className={styles.currency}>{book.currency?.toUpperCase()}</span>
//               </p>
//               <p className={styles.shipping}>Free shipping • 30-day guarantee</p>
//             </div>
            
//             <div className={styles.buttonContainer}>
//               <CheckoutButton item={book} className={styles.checkoutButton} />
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className={styles.additionalInfo}>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>📦</span>
//               <span>Usually ships within 24 hours</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>🎁</span>
//               <span>Perfect gift for children ages 3-10</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>✉️</span>
//               <span>Free digital version included</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import CheckoutButton from "../components/CheckoutButton";
import styles from "./BookDetails.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom";

// Create a portal component
const ModalPortal = ({ children }) => {
  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    const newModalRoot = document.createElement("div");
    newModalRoot.id = "modal-root";
    document.body.appendChild(newModalRoot);
    return ReactDOM.createPortal(children, newModalRoot);
  }

  return ReactDOM.createPortal(children, modalRoot);
};

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currencySign, setCurrencySign] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data.data || res.data);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setError("Failed to load book details. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (book?.currency) {
      switch (book.currency.toLowerCase()) {
        case "usd":
          setCurrencySign("$");
          break;
        case "gbp":
          setCurrencySign("£");
          break;
        case "eur":
          setCurrencySign("€");
          break;
        case "cad":
          setCurrencySign("CA$");
          break;
        default:
          setCurrencySign("");
      }
    }
  }, [book]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundIcon}>📚</div>
        <h3>Book Not Found</h3>
        <p>The book you're looking for doesn't exist or has been removed.</p>
        <a href="/books" className={styles.browseButton}>
          Browse All Books
        </a>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} data-aos="fade-down">
        <a href="/">Home</a>
        <span> / </span>
        <a href="/books">Books</a>
        <span> / </span>
        <span>{book.name}</span>
      </nav>

      <div className={styles.content}>
        {/* Book Cover Image - Left Side */}
        <div className={styles.imageSection} data-aos="fade-right">
          <div className={styles.imageContainer}>
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt={book.name}
                className={styles.coverImage}
              />
            )}
            <div className={styles.imageOverlay}>
              <span className={styles.bestsellerBadge}>Bestseller</span>
            </div>
          </div>
        </div>

        {/* Book Info - Right Side */}
        <div className={styles.infoContainer} data-aos="fade-left">
          <div className={styles.bookHeader}>
            <h1 className={styles.title}>{book.name}</h1>
            <p className={styles.author}>
              By{" "}
              <span className={styles.authorName}>
                {book.author || "Winifred"}
              </span>
            </p>

            {/* Ratings */}
            <div className={styles.ratings}>
              <div className={styles.stars}>
                {"★".repeat(5)}
                <span className={styles.ratingText}>(4.8/5)</span>
              </div>
              <span className={styles.reviewCount}>128 reviews</span>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionTitle}>About This Book</h3>
            <p className={styles.description}>{book.description}</p>
          </div>

          {/* Features */}
          {/* <div className={styles.features}>
            <h3 className={styles.sectionTitle}>What You'll Get</h3>
            <ul className={styles.featuresList}>
              <li>Beautiful, faith-inspired illustrations</li>
              <li>Biblical affirmations and scriptures</li>
              <li>High-quality paper perfect for coloring</li>
              <li>Age-appropriate content for children</li>
              <li>Digital bonus content with purchase</li>
            </ul>
          </div> */}

          {/* Price and Button Container */}
          <div className={styles.priceContainer}>
            <div className={styles.priceInfo}>
              <p className={styles.price}>
                {currencySign}
                {book.price}{" "}
                <span className={styles.currency}>
                  {book.currency?.toUpperCase()}
                </span>
              </p>
              <p className={styles.shipping}>
                Free shipping • 30-day guarantee
              </p>
            </div>

            <div className={styles.buttonContainer}>
              <CheckoutButton
                item={book}
                className={styles.checkoutButton}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📦</span>
              <span>Usually ships within 24 hours</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🎁</span>
              <span>Perfect gift for children ages 3-10</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>✉️</span>
              <span>Free digital version included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
