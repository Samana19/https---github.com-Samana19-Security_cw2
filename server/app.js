require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const cors = require("cors");
const express = require("express");
const path = require("path");

const connectDB = require("./config/db");
const app = express();
const mongoose = require("mongoose");
const upload = require("./middleware/upload");
const router = express.Router();


const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const morgan = require("morgan");

//xss attack
app.use(xss());

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    }


app.use(cors());

// Connect Database
const MONGODB_URI = 
    process.env.NODE_ENV === "test" 
    ? process.env.TEST_DB_URI  
    : process.env.DB_URI;

const mongooseUri = process.env.MONGODB_URI || "mongodb://localhost:27017/bookcommunity";
mongoose.connect(mongooseUri, {
    useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(express.json());

// Expose the public/uploads directory as a static directory
app.use('/public', express.static(path.join(__dirname, 'public')));
const uploadRoutes=router.post('/uploadImage', upload,async (req, res) => {
    try {
        if (req.file == undefined) {
            return res.status(400).send("Please upload a file!");
        }
        res.status(200).send({
            filedetails: req.file,
            message: "Uploaded the file successfully: " + req.file.originalname,
            image_url: `http://localhost:3000/public/uploads/${req.file.filename}`,
        });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});

// Init Middleware


// Define Routes
app.use('/api/books', require("./routes/api/books"));
app.use('/api/reviews', require("./routes/api/review"));
app.use('/api/addbook', require("./routes/api/addbook"));
app.use('/uploads',uploadRoutes);

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));




app.use((err,req,res,next)=>{
  console.log(err)
  if(err.name=== 'CastError'){
      res.status(400)
  }else if(err.name =="ValidationError"){
      res.status(400)
  }
  res.json({error: err.message})
});

//unknown path 
app.use((req,res,next)=>{
    res.status(404).json({message: "Path not found"})
}
);


module.exports = app;
