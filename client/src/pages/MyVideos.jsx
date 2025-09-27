// src/pages/MyVideos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // your auth context

const MyVideos = () => {
  const { user, token } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const res = await axios.get("/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // collect videos from all orders
        const purchasedVideos = [];
        res.data.data.forEach(order => {
          order.videos.forEach(v => purchasedVideos.push(v.videoId));
        });

        // fetch video details
        const videoDetails = await Promise.all(
          purchasedVideos.map(async id => {
            const videoRes = await axios.get(`/videos/${id}`);
            return videoRes.data.data;
          })
        );

        setVideos(videoDetails);
      } catch (err) {
        console.error("Failed to fetch my videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, [token]);

  if (loading) return <p className="text-center mt-4">Loading your videos...</p>;

  if (!videos.length)
    return <p className="text-center mt-4">You haven’t purchased any videos yet.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <div
            key={video._id}
            className="bg-white rounded-2xl shadow p-4 flex flex-col"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-600 mb-3">{video.description}</p>

            {video.videoUrl ? (
              <video
                src={video.videoUrl}
                controls
                className="w-full rounded-lg"
              />
            ) : (
              <p className="text-red-500">Video not available yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVideos;
