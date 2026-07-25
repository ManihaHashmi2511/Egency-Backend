require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const router = require("./routes/userRoute");
const testimonialRouter = require("./routes/testimonialRoute");
const teamRouter = require("./routes/teamRotes");
const faqRouter = require("./routes/faqRoute");
const serviceRouter = require("./routes/serviceRoute");
const blogRouter = require("./routes/blogRoute");
const portfolioRouter = require("./routes/portfolioRoute");
const caseStudyRouter = require("./routes/caseStudyRoute");
const contactRouter = require("./routes/contactRoute");
const whatWeDoRouter = require("./routes/whatWeDoRoute");
const uploadRouter = require("./routes/uploadRoute");
const comingSoonRouter = require("./routes/comingSoonRoute");
const activityLogRouter = require("./routes/activityLogRoute");

const app = express();

app.use(cors());
app.use(express.json());


app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log("DB connection failed:", error.message);
    res.status(503).json({ message: "Database temporarily unavailable, please try again" });
  }
});

app.use('/api/users', router);
app.use('/api/testimonials', testimonialRouter);
app.use('/api/team', teamRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/services', serviceRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/case-studies', caseStudyRouter);
app.use('/api/contact', contactRouter);
app.use('/api/what-we-do', whatWeDoRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/coming-soon', comingSoonRouter);
app.use('/api/activity-logs', activityLogRouter);

app.use('/test', (req, res) => {
  res.send('API is working');
});

if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running locally");
    });
  });
}

module.exports = app;