const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        name: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PracticeCategory",
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model("PracticeProduct", productSchema);