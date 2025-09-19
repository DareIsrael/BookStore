// import React, { useEffect, useState } from "react";
// import axios from "../services/api";
// import BookCard from "../components/BookCard";

// export default function BookList() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     axios.get("api/books").then(res => setBooks(res.data));
//   }, []);

//   return (
//     <div>
//       <h1>Books</h1>
//       <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
//         {books.map(book => <BookCard key={book._id} book={book} />)}
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "../services/api";
// import BookCard from "../components/BookCard";
// import styles from "./BookList.module.css";

// export default function BookList() {

//   const [books, setBooks] = useState([]);


//   useEffect(() => {
//   axios.get("/books").then(res => {
//     console.log("API response:", res.data);
//     setBooks(res.data.data);
//   }).catch(err => {
//     console.error("Error fetching books:", err);
//   });
// }, []);


//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Books</h1>
//       <p>
//         Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//         when an unknown printer took a galley of type and scrambled it to make a type
//         specimen book.
//       </p>
//       <div className={styles.booksGrid}>
//         {books.map(book => <BookCard key={book._id} book={book} />)}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "../services/api";
import BookCard from "../components/BookCard";
import styles from "./BookList.module.css";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get("/books")
      .then(res => {
        console.log("API response:", res.data);
        // Handle different response structures
        const booksData = res.data.data || res.data || [];
        setBooks(booksData);
       
      })
      .catch(err => {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log()

  return (
    <div className={styles.container}>
      {/* Hero Section with Gold Background */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Our Collections</h1>
          <p className={styles.subtitle}>
            Discover inspiring Christian books that nurture faith and empower 
            both children and adults in their spiritual journey
          </p>
        </div>
      </div>

      {/* Books Grid Section */}
      <div className={styles.contentSection}>
        <div className={styles.introText}>
          <h2 className={styles.sectionTitle}>Featured Books</h2>
          <p className={styles.description}>
            Each book in our collection is carefully crafted to inspire, educate, 
            and strengthen your faith journey. From children's coloring books to 
            spiritual guides, discover resources that will bless your family and 
            deepen your relationship with Christ.
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading books...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={styles.booksGrid}>
            {books.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No books available</h3>
                <p>Check back soon for new releases!</p>
              </div>
            ) : (
              books.map(book => <BookCard key={book._id} book={book} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "../services/api";
// import BookCard from "../components/BookCard";
// import styles from "./BookList.module.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export default function BookList() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: true,
//       easing: 'ease-out-cubic'
//     });
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     axios.get("/books")
//       .then(res => {
//         console.log("API response:", res.data);
//         // Handle different response structures
//         let booksData = [];
//         if (Array.isArray(res.data)) {
//           booksData = res.data;
//         } else if (res.data.data && Array.isArray(res.data.data)) {
//           booksData = res.data.data;
//         } else if (res.data.books && Array.isArray(res.data.books)) {
//           booksData = res.data.books;
//         }
        
//         // Sort books by creation date (newest first)
//         booksData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
//         setBooks(booksData);
//       })
//       .catch(err => {
//         console.error("Error fetching books:", err);
//         setError("Failed to load books. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Filter books based on category
//   const filteredBooks = books.filter(book => {
//     if (filter === "all") return true;
//     return book.category === filter;
//   });

//   // Sort books based on selection
//   const sortedBooks = [...filteredBooks].sort((a, b) => {
//     if (sortBy === "newest") {
//       return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//     } else if (sortBy === "oldest") {
//       return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
//     } else if (sortBy === "name") {
//       return a.name.localeCompare(b.name);
//     } else if (sortBy === "price-low") {
//       return (a.price || 0) - (b.price || 0);
//     } else if (sortBy === "price-high") {
//       return (b.price || 0) - (a.price || 0);
//     }
//     return 0;
//   });

//   return (
//     <div className={styles.container}>
//       {/* Hero Section with Gold Background */}
//       <div className={styles.heroSection}>
//         <div className={styles.heroContent} data-aos="fade-up">
//           <h1 className={styles.title}>Our Collection</h1>
//           <p className={styles.subtitle}>
//             Discover inspiring Christian books that nurture faith and empower 
//             both children and adults in their spiritual journey
//           </p>
//           <div className={styles.scrollIndicator}>
//             <span>Browse our collection</span>
//             <div className={styles.scrollArrow}></div>
//           </div>
//         </div>
//       </div>

//       {/* Books Grid Section */}
//       <div className={styles.contentSection}>
//         <div className={styles.introText} data-aos="fade-up">
//           <h2 className={styles.sectionTitle}>Featured Books</h2>
//           <p className={styles.description}>
//             Each book in our collection is carefully crafted to inspire, educate, 
//             and strengthen your faith journey. From children's coloring books to 
//             spiritual guides, discover resources that will bless your family and 
//             deepen your relationship with Christ.
//           </p>
//         </div>

//         {/* Filter and Sort Controls */}
//         {/* <div className={styles.controls} data-aos="fade-up">
//           <div className={styles.filterGroup}>
//             <label htmlFor="filter">Filter by:</label>
//             <select 
//               id="filter"
//               value={filter} 
//               onChange={(e) => setFilter(e.target.value)}
//               className={styles.select}
//             >
//               <option value="all">All Books</option>
//               <option value="children">Children's Books</option>
//               <option value="coloring">Coloring Books</option>
//               <option value="devotional">Devotionals</option>
//               <option value="study">Study Guides</option>
//             </select>
//           </div>
          
//           <div className={styles.filterGroup}>
//             <label htmlFor="sort">Sort by:</label>
//             <select 
//               id="sort"
//               value={sortBy} 
//               onChange={(e) => setSortBy(e.target.value)}
//               className={styles.select}
//             >
//               <option value="newest">Newest First</option>
//               <option value="oldest">Oldest First</option>
//               <option value="name">Alphabetical</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//             </select>
//           </div>
//         </div> */}

//         {loading ? (
//           <div className={styles.loading} data-aos="fade-in">
//             <div className={styles.spinner}></div>
//             <p>Loading books...</p>
//           </div>
//         ) : error ? (
//           <div className={styles.error} data-aos="fade-in">
//             <p>{error}</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className={styles.retryButton}
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className={styles.resultsInfo} data-aos="fade-up">
//               {/* <p>
//                 Showing {sortedBooks.length} of {books.length} books
//                 {filter !== "all" && ` in "${filter}" category`}
//               </p> */}
//             </div>
            
//             <div className={styles.booksGrid}>
//               {sortedBooks.length === 0 ? (
//                 <div className={styles.emptyState} data-aos="fade-up">
//                   <div className={styles.emptyIcon}>📚</div>
//                   <h3>No books found</h3>
//                   <p>Try adjusting your filters or check back soon for new releases!</p>
//                   {filter !== "all" && (
//                     <button 
//                       onClick={() => setFilter("all")}
//                       className={styles.clearFilters}
//                     >
//                       Clear Filters
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 sortedBooks.map((book, index) => (
//                   <div 
//                     key={book._id} 
//                     data-aos="fade-up" 
//                     data-aos-delay={index % 6 * 100}
//                   >
//                     <BookCard book={book} />
//                   </div>
//                 ))
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }