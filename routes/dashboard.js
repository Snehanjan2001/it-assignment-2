const express = require("express")
const router = require("express").Router()
const multer = require("multer")
const User = require("../models/User")
const File = require("../models/File")



//setting up the multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = file.originalname.split(".")[1]
        cb(null, uniqueSuffix + "." + extension)
    }
})

const upload = multer({ storage: storage })



//The dashboard routes
router.get("/", (req, res) => {
    res.send("This is the dashboard")
})
router
    .route("/:username")
    .get((req, res) => {
        res.render("clients/dashboard.ejs", { user: req.params.username })
    })
    .post(upload.single('file'), (req, res) => {
        const userName = req.params.username
        const tempFileModel = new File({
            filename: req.file.filename
        })



        User.updateOne({ username: userName }, { "$push": { files: tempFileModel } }, (err) => {
            if (err) {
                console.log("ERROR")
            } else {

                console.log(req.file)
            }
        })
        console.log("Files uploaded")
        res.json(req.body)
    })







//Admin dashboard
router.get("/admin/:username", (req, res) => {
    res.send("This is the dashboard of admin " + req.params.username)
})

module.exports = router