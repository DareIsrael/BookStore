// src/components/VideoCard.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import styles from "./VideoCard.module.css"; // ✅ reuse same styles

export default function VideoCard({ video }) {
  const [currencySign, setCurrencySign] = useState("");

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

  return (
    <div className={styles.card}>
      {/* Video Intro Preview */}
      {video.introVideo ? (
        <video
          src={video.introVideo}
          controls
          className={styles.coverImage}
        />
      ) : (
        <div className={styles.noPreview}>No Preview Available</div>
      )}

      {/* Video Info */}
      <div className={styles.content}>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.description}>
          {video.description?.slice(0, 80)}...
        </p>
      </div>

      {/* Price and Actions Container */}
      <div className={styles.footer}>
        {video.price && (
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              {currencySign}
              {video.price.toFixed(2)} {video.currency?.toUpperCase()}
            </span>
          </div>
        )}

        <div className={styles.actions}>
          <Link to={`/videos/${video._id}`} className={styles.previewLink}>
            Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
