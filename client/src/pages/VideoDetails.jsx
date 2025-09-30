// // src/pages/VideoDetails.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "../services/api";
// import CheckoutButton from "../components/CheckoutButton";
// import styles from "./VideoDetails.module.css"; // ✅ reuse same styles
// import AOS from "aos";
// import "aos/dist/aos.css";
// import ReactDOM from "react-dom";

// // Create a portal component (for modals if needed)
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

// export default function VideoDetails() {
//   const { id } = useParams();
//   const [video, setVideo] = useState(null);
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
//       .get(`/videos/${id}`)
//       .then((res) => {
//         setVideo(res.data.data || res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching video:", err);
//         setError("Failed to load video details. Please try again later.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   useEffect(() => {
//     if (video?.currency) {
//       switch (video.currency.toLowerCase()) {
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
//   }, [video]);

//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <div className={styles.spinner}></div>
//         <p>Loading video details...</p>
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

//   if (!video) {
//     return (
//       <div className={styles.notFoundContainer}>
//         <div className={styles.notFoundIcon}>🎬</div>
//         <h3>Video Not Found</h3>
//         <p>The video you're looking for doesn't exist or has been removed.</p>
//         <a href="/videos" className={styles.browseButton}>
//           Browse All Videos
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
//         <a href="/videos">Videos</a>
//         <span> / </span>
//         <span>{video.title}</span>
//       </nav>

//       <div className={styles.content}>
//         {/* Video Thumbnail / Preview - Left Side */}
//         <div className={styles.imageSection} data-aos="fade-right">
//           <div className={styles.imageContainer}>
//             {video.introVideo ? (
//               <video
//                 controls
//                 src={video.introVideo}
//                 poster={video.introVideo}
//                 className={styles.coverImage}
//               />
//             ) : (
//               video.thumbnail && (
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className={styles.coverImage}
//                 />
//               )
//             )}
//           </div>
//         </div>

//         {/* Video Info - Right Side */}
//         <div className={styles.infoContainer} data-aos="fade-left">
//           <div className={styles.bookHeader}>
//             <h1 className={styles.title}>{video.title}</h1>
//             <p className={styles.author}>
//               By{" "}
//               <span className={styles.authorName}>
//                 {video.author || "Winifred"}
//               </span>
//             </p>

//             {/* Ratings */}
//             <div className={styles.ratings}>
//               <div className={styles.stars}>
//                 {"★".repeat(5)}
//                 <span className={styles.ratingText}>(4.9/5)</span>
//               </div>
//               <span className={styles.reviewCount}>76 reviews</span>
//             </div>
//           </div>

//           <div className={styles.descriptionSection}>
//             <h3 className={styles.sectionTitle}>About This Video</h3>
//             <p className={styles.description}>{video.description}</p>
//           </div>

//           {/* Features */}
//           {/* <div className={styles.features}>
//             <h3 className={styles.sectionTitle}>What You'll Learn</h3>
//             <ul className={styles.featuresList}>
//               <li>Practical, engaging lessons</li>
//               <li>High-quality video production</li>
//               <li>Step-by-step breakdowns</li>
//               <li>Exclusive access after purchase</li>
//               <li>Bonus materials sent to your email</li>
//             </ul>
//           </div> */}

//           {/* Price and Button Container */}
//           <div className={styles.priceContainer}>
//             <div className={styles.priceInfo}>
//               <p className={styles.price}>
//                 {currencySign}
//                 {video.price}{" "}
//                 <span className={styles.currency}>
//                   {video.currency?.toUpperCase()}
//                 </span>
//               </p>
//               <p className={styles.shipping}>
//                 Digital access delivered to your dashboard
//               </p>
//             </div>

//             <div className={styles.buttonContainer}>
//               <CheckoutButton
//                 item={video}
//                 className={styles.checkoutButton}
//               />
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className={styles.additionalInfo}>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>📧</span>
//               <span>Video link delivered via email</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>🎓</span>
//               <span>Great for self-paced learning</span>
//             </div>
//             <div className={styles.infoItem}>
//               <span className={styles.infoIcon}>♾️</span>
//               <span>Unlimited replays anytime</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/VideoDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import CheckoutButton from "../components/CheckoutButton";
import styles from "./VideoDetails.module.css"; // ✅ reuse same styles
import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom";

// Create a portal component (for modals if needed)
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

export default function VideoDetails() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
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
      .get(`/videos/${id}`)
      .then((res) => {
        setVideo(res.data.data || res.data);
      })
      .catch((err) => {
        console.error("Error fetching video:", err);
        setError("Failed to load video details. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (video?.currency) {
      switch (video.currency.toLowerCase()) {
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
  }, [video]);

  const handlePdfDownload = async (e) => {
    e.preventDefault();
    if (!video.pdf) return;

    try {
      const response = await fetch(video.pdf);
      const blob = await response.blob();
      
      // Check if it's actually a PDF
      if (blob.type !== 'application/pdf') {
        console.warn('File is not a PDF, type:', blob.type);
      }
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Extract filename
      let filename = `${video.title.replace(/\s+/g, '_')}_resources.pdf`;
      
      // Try to get filename from headers
      const contentDisposition = response.headers.get('Content-Disposition');
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Fallback: open in new tab
      window.open(video.pdf, '_blank');
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading video details...</p>
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

  if (!video) {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundIcon}>🎬</div>
        <h3>Video Not Found</h3>
        <p>The video you're looking for doesn't exist or has been removed.</p>
        <a href="/videos" className={styles.browseButton}>
          Browse All Videos
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
        <a href="/videos">Videos</a>
        <span> / </span>
        <span>{video.title}</span>
      </nav>

      <div className={styles.content}>
        {/* Video Thumbnail / Preview - Left Side */}
        <div className={styles.imageSection} data-aos="fade-right">
          <div className={styles.imageContainer}>
            {video.introVideo ? (
              <video
                src={video.introVideo + "#t=0.1"} muted playsInline controls className={styles.coverImage} poster={video.introVideo + "#t=0.1"}
              />
            ) : (
              video.thumbnail && (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={styles.coverImage}
                />
              )
            )}
            
            {/* PDF Download Tag */}
            {video.pdf && (
              <a
                href={video.pdf}
                download={`${video.title.replace(/\s+/g, '_')}_resources.pdf`}
                onClick={handlePdfDownload}
                className={styles.pdfTag}
                title={`Download ${video.title} Resources PDF`}
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <span className={styles.pdfIcon}>📄</span>
                <span className={styles.pdfText}>Download Resources</span>
              </a>
            )}
          </div>
        </div>

        {/* Video Info - Right Side */}
        <div className={styles.infoContainer} data-aos="fade-left">
          <div className={styles.bookHeader}>
            <h1 className={styles.title}>{video.title}</h1>
            <p className={styles.author}>
              By{" "}
              <span className={styles.authorName}>
                {video.author || "Winifred"}
              </span>
            </p>

            {/* Ratings */}
            <div className={styles.ratings}>
              <div className={styles.stars}>
                {"★".repeat(5)}
                <span className={styles.ratingText}>(4.9/5)</span>
              </div>
              <span className={styles.reviewCount}>76 reviews</span>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.sectionTitle}>About This Video</h3>
            <p className={styles.description}>{video.description}</p>
          </div>

          {/* Features */}
          {/* <div className={styles.features}>
            <h3 className={styles.sectionTitle}>What You'll Learn</h3>
            <ul className={styles.featuresList}>
              <li>Practical, engaging lessons</li>
              <li>High-quality video production</li>
              <li>Step-by-step breakdowns</li>
              <li>Exclusive access after purchase</li>
              <li>Bonus materials sent to your email</li>
            </ul>
          </div> */}

          {/* Price and Button Container */}
          <div className={styles.priceContainer}>
            <div className={styles.priceInfo}>
              <p className={styles.price}>
                {currencySign}
                {video.price}{" "}
                <span className={styles.currency}>
                  {video.currency?.toUpperCase()}
                </span>
              </p>
              <p className={styles.shipping}>
                Digital access delivered to your dashboard
              </p>
            </div>

            <div className={styles.buttonContainer}>
              <CheckoutButton
                item={video}
                className={styles.checkoutButton}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📧</span>
              <span>Video link delivered via email</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>🎓</span>
              <span>Great for self-paced learning</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>📄</span>
              <span>Downloadable resources included</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>♾️</span>
              <span>Unlimited replays anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}