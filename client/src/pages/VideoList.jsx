// // src/pages/VideoList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "../services/api";
// import VideoCard from "../components/VideoCard";
// import styles from "./BookList.module.css"; // ✅ reuse same CSS styles

// export default function VideoList() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("/videos")
//       .then((res) => {
//         console.log("API response:", res.data);
//         const videosData = res.data.data || res.data || [];
//         setVideos(videosData);
//       })
//       .catch((err) => {
//         console.error("Error fetching videos:", err);
//         setError("Failed to load videos. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className={styles.container}>
//       {/* Hero Section */}
//       <div className={styles.heroSection}>
//   <div className={styles.heroContent}>
//     <h1 className={styles.title}>Discover Your Divine Purpose</h1>
//     <p className={styles.subtitle}>
//       Get one-on-one coaching to uncover your God-given talents, navigate life transitions, 
//       and align your daily walk with Christ's calling for your life.
//     </p>
//   </div>
// </div>

//       {/* Videos Grid Section */}
//       <div className={styles.contentSection}>
//         <div className={styles.introText}>
//           <h2 className={styles.sectionTitle}>Featured Videos</h2>
//           <p className={styles.description}>
//             Each video in our library is created to inspire, teach, and uplift 
//             your spirit. From short inspirational clips to full-length teachings, 
//             discover powerful content that deepens your walk with Christ.
//           </p>
//         </div>

//         {loading ? (
//           <div className={styles.loading}>
//             <div className={styles.spinner}></div>
//             <p>Loading videos...</p>
//           </div>
//         ) : error ? (
//           <div className={styles.error}>
//             <p>{error}</p>
//           </div>
//         ) : (
//           <div className={styles.booksGrid}>
//             {videos.length === 0 ? (
//               <div className={styles.emptyState}>
//                 <h3>No videos available</h3>
//                 <p>Check back soon for new content!</p>
//               </div>
//             ) : (
//               videos.map((video) => <VideoCard key={video._id} video={video} />)
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/VideoList.jsx
import React, { useEffect, useState } from "react";
import axios from "../services/api";
import VideoCard from "../components/VideoCard";
import styles from "./BookList.module.css"; // ✅ reuse same CSS styles

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("/videos")
      .then((res) => {
        // console.log("API response:", res.data);
        const videosData = res.data.data || res.data || [];
        setVideos(videosData);
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Step into Clarity. Embrace Alignment. Live on Purpose.</h1>
          <p className={styles.subtitle}>
            My coaching helps women like you find clarity, build belief, create structure, and execute with discipline — all rooted in faith. Each package is designed to meet you where you are and guide you toward the life God is calling you to build.
          </p>
          {/* <p className={styles.invitation}>
            Whether you need a single clarity boost or long-term accountability, there's a package here for you. Choose the one that speaks to your season — and let's walk this journey together, with God at the center.
          </p> */}
        </div>
      </div>

      {/* Videos Grid Section */}
      <div className={styles.contentSection}>
        <div className={styles.introText}>
          <h2 className={styles.sectionTitle}>Featured Coaching Sessions</h2>
          <p className={styles.description}>
            Whether you need a single clarity boost or long-term accountability, there's a package here for you. Choose the one that speaks to your season — and let's walk this journey together, with God at the center.
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading coaching sessions...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={styles.booksGrid}>
            {videos.length === 0 ? (
              <div className={styles.emptyState}>
                <h3>No coaching sessions available</h3>
                <p>New transformative content coming soon!</p>
              </div>
            ) : (
              videos.map((video) => <VideoCard key={video._id} video={video} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}