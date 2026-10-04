const mongoose = require("mongoose")


const categorySchema = new mongoose.model({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    }
})