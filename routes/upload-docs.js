const express = require("express")
const router = require("express").Router()
const multer = require("multer")
const User = require("../models/User")
const File = require("../models/File")



//The upload routes
router.get("/", (req, res) => {
    res.send("This is the uploads")
})
router
    .route("/:username")
    .get((req, res) => {
        // res.render("clients/uploads.ejs", { user: req.params.username })
        User.findOne({ username: req.params.username }, (err, people) => {
                if (err)
                    console.log(err)
                else {
                    console.log(people)
                    res.render("clients/uploads.ejs", { user: req.params.username, files: people.files })
                }
            })
            // console.log(userName)

    })

module.exports = router