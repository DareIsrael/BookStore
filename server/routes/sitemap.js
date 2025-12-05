const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const books = await Book.find();

    const baseUrl = "https://www.winifredfagbolagun.com";

    let urls = books
      .map(
        (book) => `
      <url>
        <loc>${baseUrl}/books/${book._id}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>

      <url>
        <loc>${baseUrl}/books</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>

      ${urls}

    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml.trim());
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).send("Error generating sitemap");
  }
});

module.exports = router;
