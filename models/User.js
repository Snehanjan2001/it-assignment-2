const mongoose = require("mongoose")


//File Schema
const FileSchema = new mongoose.Schema({
    filename: {
        type: String

    },




}, { timestamps: true });

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 25,
        unique: true

    },

    email: {
        type: String,
        required: true,
        max: 60,
        unique: true,
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,

    },
    files: [{
        type: FileSchema
    }]



}, { timestamps: true });

module.exports = mongoose.model("hornynibba", UserSchema)