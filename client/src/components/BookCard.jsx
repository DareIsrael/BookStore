// import React from "react";
// import { Link } from "react-router-dom";
// import CheckoutButton from "./CheckoutButton"; // ✅ import it

// export default function BookCard({ book }) {
//   return (
//     <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
//       <h3>{book.name}</h3>
//       <p>{book.description?.slice(0, 50)}...</p>
//       <Link to={`/books/${book._id}`}>Preview</Link>

//       {/* ✅ pass the whole book object */}
//       <CheckoutButton item={book} />
//     </div>
//   );
// }


// import React from "react";
// import { Link } from "react-router-dom";
// import CheckoutButton from "./CheckoutButton";
// import styles from "./BookCard.module.css";

// export default function BookCard({ book }) {
//   return (
//     <div className={styles.card}>
//       {/* Book Cover Image */}
//       {book.coverImage && (
//         <img
//           src={book.coverImage}
//           alt={book.name}
//           className={styles.coverImage}
//         />
//       )}

//       {/* Book Info */}
//       <h3 className={styles.title}>{book.name}</h3>
//       <p className={styles.description}>{book.description?.slice(0, 50)}...</p>

//       {/* Links and Buttons */}
//       <Link to={`/books/${book._id}`} className={styles.previewLink}>
//         Preview
//       </Link>
//       <div className={styles.buttonContainer}>
//         <CheckoutButton item={book} />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import CheckoutButton from "./CheckoutButton";
// import styles from "./BookCard.module.css";

// export default function BookCard({ book }) {
//   return (
//     <div className={styles.card}>
//       {/* Book Cover Image */}
//       {book.coverImage && (
//         <img
//           src={book.coverImage}
//           alt={`Cover of ${book.name}`}
//           className={styles.coverImage}
//         />
//       )}

//       {/* Book Info */}
//       <div className={styles.content}>
//         <h3 className={styles.title}>{book.name}</h3>
//         <p className={styles.description}>
//           {book.description?.slice(0, 80)}...
//         </p>
        
//         {/* Price display */}
//         {book.price && (
//           <p className={styles.price}>${book.price.toFixed(2)}</p>
//         )}
//       </div>

//       {/* Links and Buttons */}
//       <div className={styles.actions}>
//         <Link to={`/books/${book._id}`} className={styles.previewLink}>
//           Preview
//         </Link>
//         {/* <div className={styles.buttonContainer}>
//           <CheckoutButton item={book} />
//         </div> */}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CheckoutButton from "./CheckoutButton";
// import styles from "./BookCard.module.css";

// export default function BookCard({ book }) {

//   const [currencySign, setCurrencySign] = useState("");

//   useEffect(() => {
//       if (book?.currency) {
//         switch (book.currency.toLowerCase()) {
//           case "usd":
//             setCurrencySign("$");
//             break;
//           case "gbp":
//             setCurrencySign("£");
//             break;
//           case "eur":
//             setCurrencySign("€");
//             break;
//           case "cad":
//             setCurrencySign("CA$");
//             break;
//           default:
//             setCurrencySign("");
//         }
//       }
//     }, [book]);

//   return (
//     <div className={styles.card}>
//       {/* Book Cover Image */}
//       {book.coverImage && (
//         <img
//           src={book.coverImage}
//           alt={`Cover of ${book.name}`}
//           className={styles.coverImage}
//         />
//       )}

//       {/* Book Info */}
//       <div className={styles.content}>
//         <h3 className={styles.title}>{book.name}</h3>
//         <p className={styles.description}>
//           {book.description?.slice(0, 80)}...
//         </p>
//       </div>

//       {/* Price and Actions Container */}
//       <div className={styles.footer}>
//         {/* Price display */}
//         {book.price && (
//           <div className={styles.priceContainer}>
//             <span className={styles.price}>{currencySign}{book.price.toFixed(2)} {book.currency?.toUpperCase()}</span>
//           </div>
//         )}
        
//         {/* Links and Buttons */}
//         <div className={styles.actions}>
//           <Link to={`/books/${book._id}`} className={styles.previewLink}>
//             Preview
//           </Link>
//           {/* Uncomment if you want the checkout button too */}
//           {/* <div className={styles.buttonContainer}>
//             <CheckoutButton item={book} />
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import styles from "./BookCard.module.css";

export default function BookCard({ book }) {
  const [currencySign, setCurrencySign] = useState("");

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

  const handlePdfDownload = (e) => {
    // Optional: Add any download tracking or analytics here
    console.log(`Downloading PDF for: ${book.name}`);
    // The download will happen automatically due to the download attribute
  };

  return (
    <div className={styles.card}>
      {/* PDF Download Tag (Top-Right) */}
      {/* {book.pdf && (
        <a
          href={book.pdf}
          download={`${book.name.replace(/\s+/g, '_')}.pdf`}
          onClick={handlePdfDownload}
          className={styles.pdfTag}
          title={`Download ${book.name} PDF`}
        >
          <span className={styles.pdfIcon}>📄</span>
          <span className={styles.pdfText}>Download Resources</span>
        </a>
      )} */}

      {/* Book Cover Image */}
      {book.coverImage && (
        <img
          src={book.coverImage}
          alt={`Cover of ${book.name}`}
          className={styles.coverImage}
        />
      )}

      {/* Book Info */}
      <div className={styles.content}>
        <h3 className={styles.title}>{book.name}</h3>
        <p className={styles.author}>By {book.author}</p>
        <p className={styles.description}>
          {book.description?.slice(0, 80)}...
        </p>
      </div>

      {/* Price and Actions Container */}
      <div className={styles.footer}>
        {book.price && (
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {currencySign}
              {book.price.toFixed(2)}
            </span>
            <span className={styles.currency}>{book.currency?.toUpperCase()}</span>
          </div>
        )}

        <div className={styles.actions}>
          <Link to={`/books/${book._id}`} className={styles.previewLink}>
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}