require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', router);

//testimonials route
app.use('/api/testimonials', testimonialRouter);

//team route
app.use('/api/team', teamRouter);

//faq route
app.use('/api/faqs', faqRouter);

//service route
app.use('/api/services', serviceRouter); 

//blog route
app.use('/api/blogs', blogRouter);

//portfolio route
app.use('/api/portfolio', portfolioRouter);

//case study route
app.use('/api/case-studies', caseStudyRouter);

//contact route
app.use('/api/contact', contactRouter);

//what we do route
app.use('/api/what-we-do', whatWeDoRouter);

//upload route
app.use('/api/upload', uploadRouter);

app.use('/test', (req, res) => {
    res.send('API is working')
})

// mongoose connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
}

module.exports = app;