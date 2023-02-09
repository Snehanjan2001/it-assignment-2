const express = require("express")
const app = express()
const mongoose = require("mongoose")
const helmet = require("helmet")
const dotenv = require("dotenv")
const morgan = require("morgan")
const req = require("express/lib/request")
const multer = require('multer')
const cors = require("cors")
const authRoute = require("./routes/auth")
const dashboardRoute = require("./routes/dashboard")
const uploaded_Route = require("./routes/upload-docs")



dotenv.config();
mongoose.set('strictQuery', true)
mongoose.connect(
    process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log("error in connection");
        } else {
            console.log("mongodb is connected");
        }
    });


//middlewares

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static("public"))






app.get("/", (req, res) => {
    res.send("This is the first page")
})
app.use("/auth", authRoute)
app.use("/dashboard", dashboardRoute)
app.use("/upload", uploaded_Route)
app.set("view-engine", "ejs")











app.listen(8000, () => {
    console.log("The server is running")
})