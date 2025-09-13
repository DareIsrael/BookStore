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

import React from "react";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import styles from "./BookCard.module.css";

export default function BookCard({ book }) {
  return (
    <div className={styles.card}>
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
        <p className={styles.description}>
          {book.description?.slice(0, 80)}...
        </p>
      </div>

      {/* Price and Actions Container */}
      <div className={styles.footer}>
        {/* Price display */}
        {book.price && (
          <div className={styles.priceContainer}>
            <span className={styles.price}>${book.price.toFixed(2)}</span>
          </div>
        )}
        
        {/* Links and Buttons */}
        <div className={styles.actions}>
          <Link to={`/books/${book._id}`} className={styles.previewLink}>
            Preview
          </Link>
          {/* Uncomment if you want the checkout button too */}
          {/* <div className={styles.buttonContainer}>
            <CheckoutButton item={book} />
          </div> */}
        </div>
      </div>
    </div>
  );
}