
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./BookDetails.module.css";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ReactDOM from "react-dom";
// import { Helmet } from "react-helmet";

// // Create a portal component
// const ModalPortal = ({ children }) => {
//   const modalRoot = document.getElementById("modal-root");

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
//   const [currencySign, setCurrencySign] = useState("");

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: "ease-out-cubic",
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`/books/${id}`)
//       .then((res) => {
//         setBook(res.data.data || res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching book:", err);
//         setError("Failed to load book details. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   useEffect(() => {
//     if (book?.currency) {
//       switch (book.currency.toLowerCase()) {
//         case "usd":
//           setCurrencySign("$");
//           break;
//         case "gbp":
//           setCurrencySign("£");
//           break;
//         case "eur":
//           setCurrencySign("€");
//           break;
//         case "cad":
//           setCurrencySign("CA$");
//           break;
//         default:
//           setCurrencySign("");
//       }
//     }
//   }, [book]);

//   const handlePdfDownload = () => {
//     // Optional: Add download tracking or analytics
//     console.log(`Downloading PDF for: ${book.name}`);
//     // The download will happen automatically due to the download attribute
//   };

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
            
//             {/* Badges Container */}
//             <div className={styles.badgesContainer}>
//               {/* Bestseller Badge */}
//               <div className={styles.imageOverlay}>
//                 <span className={styles.bestsellerBadge}>Bestseller</span>
//               </div>
              
//               {/* PDF Download Tag */}
//             {book.pdf && (
//   <a
//     href={book.pdf.replace("/upload/", "/upload/fl_attachment/")}
//     download={`${book.name.replace(/\s+/g, "_")}.pdf`}
//     className={styles.pdfTag}
//     title={`Download ${book.name} PDF`}
//     data-aos="zoom-in"
//     data-aos-delay="300"
//     onClick={(e) => {
//       e.preventDefault();
//       const link = document.createElement("a");
//       link.href = book.pdf.replace("/upload/", "/upload/fl_attachment/");
//       link.setAttribute("download", `${book.name.replace(/\s+/g, "_")}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }}
//   >
//     <span className={styles.pdfIcon}>📄</span>
//     <span className={styles.pdfText}>Download Resources</span>
//   </a>
// )}


//             </div>
//           </div>
//         </div>

//         {/* Book Info - Right Side */}
//         <div className={styles.infoContainer} data-aos="fade-left">
//           <div className={styles.bookHeader}>
//             <h1 className={styles.title}>{book.name}</h1>
//             <p className={styles.author}>
//               By{" "}
//               <span className={styles.authorName}>
//                 {book.author || "Winifred"}
//               </span>
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

//           {/* Price and Button Container */}
//           <div className={styles.priceContainer}>
//             <div className={styles.priceInfo}>
//               <p className={styles.price}>
//                 {currencySign}
//                 {book.price}{" "}
//                 <span className={styles.currency}>
//                   {book.currency?.toUpperCase()}
//                 </span>
//               </p>
//               <p className={styles.shipping}>
//                 Free shipping • 30-day guarantee
//               </p>
//             </div>

//             <div className={styles.buttonContainer}>
//               <CheckoutButton
//                 item={book}
//                 className={styles.checkoutButton}
//               />
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
//               <span className={styles.infoIcon}>📄</span>
//               <span>Instant PDF download available</span>
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
import { Helmet } from "react-helmet";

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

  const handlePdfDownload = () => {
    console.log(`Downloading PDF for: ${book.name}`);
  };

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
    <>
      {/* SEO META TAGS */}
      <Helmet>
        <title>{book.name} | Winifred Bookstore</title>

        <meta
          name="description"
          content={
            book.description
              ? book.description.substring(0, 150)
              : "Children's book available on Winifred Bookstore."
          }
        />

        <meta property="og:title" content={book.name} />
        <meta
          property="og:description"
          content={
            book.description
              ? book.description.substring(0, 150)
              : "Children's book available on Winifred Bookstore."
          }
        />
        <meta property="og:image" content={book.coverImage} />
        <meta
          property="og:url"
          content={`https://www.winifredfagbolagun.com/books/${id}`}
        />

        <meta
          name="keywords"
          content={`${book.name}, ${book.author || "Winifred"}, children's books, buy kids books`}
        />
      </Helmet>

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
          {/* Book Cover Image */}
          <div className={styles.imageSection} data-aos="fade-right">
            <div className={styles.imageContainer}>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.name}
                  className={styles.coverImage}
                />
              )}

              <div className={styles.badgesContainer}>
                <div className={styles.imageOverlay}>
                  <span className={styles.bestsellerBadge}>Bestseller</span>
                </div>

                {book.pdf && (
                  <a
                    href={book.pdf.replace("/upload/", "/upload/fl_attachment/")}
                    download={`${book.name.replace(/\s+/g, "_")}.pdf`}
                    className={styles.pdfTag}
                    title={`Download ${book.name} PDF`}
                    data-aos="zoom-in"
                    data-aos-delay="300"
                    onClick={(e) => {
                      e.preventDefault();
                      const link = document.createElement("a");
                      link.href = book.pdf.replace(
                        "/upload/",
                        "/upload/fl_attachment/"
                      );
                      link.setAttribute(
                        "download",
                        `${book.name.replace(/\s+/g, "_")}.pdf`
                      );
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <span className={styles.pdfIcon}>📄</span>
                    <span className={styles.pdfText}>Download Resources</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className={styles.infoContainer} data-aos="fade-left">
            <div className={styles.bookHeader}>
              <h1 className={styles.title}>{book.name}</h1>
              <p className={styles.author}>
                By{" "}
                <span className={styles.authorName}>
                  {book.author || "Winifred"}
                </span>
              </p>

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
                <CheckoutButton item={book} className={styles.checkoutButton} />
              </div>
            </div>

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
                <span className={styles.infoIcon}>📄</span>
                <span>Instant PDF download available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
