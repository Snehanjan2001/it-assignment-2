const mongoose = require("mongoose")


//File Schema
const FileSchema = new mongoose.Schema({
    filename: {
        type: String

    },




}, { timestamps: true });

const File = mongoose.model("fileupload", FileSchema)
module.exports = File