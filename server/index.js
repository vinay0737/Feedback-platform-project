const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const formRoutes = require("./routes/formRoutes");
const responseRoutes = require("./routes/responseRoutes");

dotenv.config();
const app = express();
app.use(cors({
    origin: "https://feedback-platform-project-psi.vercel.app",
    credentials: true // only if you're using cookies/auth headers
  }));
  
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/responses", responseRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000")))
    .catch(err => console.log("❌ DB Connection Failed:", err));
