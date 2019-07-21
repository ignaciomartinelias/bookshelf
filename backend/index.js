if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express"),
    morgan = require("morgan"),
    multer = require("multer"),
    path = require("path"),
    DB = require("./database");

//! Initializations
const app = express();

//! Middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({storage}).single('image'));

app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(require("cors")());

//! Routes
app.use("/api/books" , require("./routes/books.js"));

//! Static Files
app.use(express.static(path.join(__dirname, "public")));

//! Starting the server
app.listen(process.env.PORT, process.env.IP, () => console.log("Server Connected!"));