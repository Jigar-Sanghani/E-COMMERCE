const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    image: {
        type: Array,
        required: [true, "Product image is required"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"]
    },
    subcategory: {
        type: String,
        required: [true, "Product sub-category is required"]
    },
    sizes: {
        type: Array,
        required: [true, "Product size is required"]
    },
    bestseller: {
        type: Boolean
    },
    date: {
        type: Number,
        required: [true]
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
