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
