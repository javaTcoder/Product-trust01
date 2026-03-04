const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");
const cookieParser = require("cookie-parser");
const path = require("path");

const cors = require("cors");

const fileUpload = require("express-fileupload"); // ✅ for review uploads
// const path = require("path");

// ✅ Parse cookies first (used in authentication middleware)
app.use(cookieParser());

// ✅ Global JSON and URL-encoded parsers (for all routes like profile/product updates)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// NOTE: Commented out global `express-fileupload` to avoid conflicts with multer
// app.use(
//   fileUpload({
//     useTempFiles: true, // temporary file storage
//     tempFileDir: "/tmp/",
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
//   })
// );

// ✅ CORS configuration (allow frontend connection)
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? (process.env.FRONTEND_URL || "http://localhost:5173")
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Import all routes







// routes

const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute")
const payment = require("./route/paymentRoute");
const emailVerification = require("./route/emailVerificationRoute");
const review = require("./route/reviewRoutes");
const support = require("./route/supportRoute");
const abusiveReport = require("./route/abusiveReportRoute");

// for req.cookie to get token while autentication

// Sitemap endpoint (must be before catch-all routes)
app.get("/sitemap.xml", async (req, res) => {
  try {
    const Product = require("./model/ProductModel");
    const products = await Product.find().select("_id").lean();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add home page
    xml += '  <url>\n    <loc>https://product-trust.onrender.com/</loc>\n    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
    
    // Add products page
    xml += '  <url>\n    <loc>https://product-trust.onrender.com/products</loc>\n    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n';
    
    // Add all products
    products.forEach(product => {
      xml += '  <url>\n';
      xml += `    <loc>https://product-trust.onrender.com/product/${product._id}</loc>\n`;
      xml += '    <lastmod>' + new Date().toISOString().split('T')[0] + '</lastmod>\n';
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    res.header('Content-Type', 'application/xml; charset=utf-8');
    res.header('Cache-Control', 'public, max-age=86400');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).header('Content-Type', 'text/plain').send('Error generating sitemap');
  }
});

// Robots.txt endpoint
app.get("/robots.txt", (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(`# robots.txt for Product Trust

User-agent: *
Allow: /

# Public API endpoints allowed
Allow: /api/v1/product
Allow: /api/v1/review

# Block private endpoints
Disallow: /api/v1/admin
Disallow: /api/v1/auth
Disallow: /api/v1/payment

# Dynamic sitemap endpoint
Sitemap: https://product-trust.onrender.com/sitemap.xml`);
});

app.use("/api/v1", emailVerification);
app.use("/api/v1", review);
app.use("/api/v1", support);
app.use("/api/v1", abusiveReport);
// app.use("/api/v1", emailVerification); // for email verification



app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use(errorMiddleware);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}





module.exports = app;
