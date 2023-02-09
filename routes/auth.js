const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const path = require("path")

router.get("/", (req, res) => {
    res.send("This is the auth page")
})




// REGISTER 
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "register.html"));
});
router.post("/register", async(req, res) => {

    try {
        //creating a salt(that is a random string to hash)
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);

        //creating the new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword
        });

        const user = await newUser.save();
        res.status(200).redirect("/dashboard/" + user.username)

    } catch (error) {
        console.log(error);

    }




})



//LOGIN
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});
router.post("/login", async(req, res) => {


    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("user not found");


        //checking the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password")
            //user email and password are valid

        res.status(200).redirect("/dashboard/" + user.username)

    } catch (error) {
        res.status(500).json(error)

    }

})


module.exports = router