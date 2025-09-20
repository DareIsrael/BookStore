// const cron = require('node-cron');
// const axios = require('axios');

// function spinServer() {
//   axios
//     .get('http://localhost:5000') // Replace with your actual domain
//     .then((res) => {
//       console.log('✅ Ping successful:', res.status);
//     })
//     .catch((err) => {
//       console.error('❌ Ping failed:', err.message);
//     });
// }

// module.exports = function () {
//   cron.schedule('*/10 * * * *', () => {
//     console.log('⏰ Running cron job every 10 minutes');
//     spinServer();
//   });
// };


// cronJob.js
const cron = require("node-cron");
const axios = require("axios");

// Use environment variable for production URL, fallback to localhost
const BACKEND_URL =
  process.env.CLIENT_URL_PRO || "http://localhost:5000";

// Always ping the /books endpoint (or whichever you prefer)
function spinServer() {
  axios
    .get(`${BACKEND_URL}/books`)
    .then((res) => {
      console.log("✅ Ping successful:", res.status);
    })
    .catch((err) => {
      console.error("❌ Ping failed:", err.message);
    });
}

module.exports = function () {
  cron.schedule("*/10 * * * *", () => {
    console.log("⏰ Running cron job every 10 minutes on:", `${BACKEND_URL}/books`);
    spinServer();
  });
};
