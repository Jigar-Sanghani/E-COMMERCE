const { v2: cloudinary } = require('cloudinary');
const Product = require('../models/product_models');

const listproducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.json({ success: true, products });

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message });

    }
};

const removeproducts = async (req, res) => {

    try {

        const { id } = req.body;
        await Product.findByIdAndDelete(id)
        res.json({ success: true, message: "Product deleted successfully" });


    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

const addproducts = async (req, res) => {

    try {

        const { name, description, price, category, subcategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imageurl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url;
            })
        )

        const productdata = {
            name,
            description,
            category,
            subcategory,
            price: Number(price),
            bestseller: bestseller === "true" ? "true" : "false",
            sizes: JSON.parse(sizes),
            image: imageurl,
            date: Date.now()
        }

        console.log(productdata);

        const product = new Product(productdata)
        await product.save()

        res.json({ success: true, message: "Product Added successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

const singleproducts = async (req, res) => {

    try {
        
        const {productId}= req.body

        const product = await Product.findById(productId)

        res.json({ success: true, product });

    } catch (error) {
        
        console.log(error);
        res.json({ success: false, message: error.message })
        
    }

}

module.exports = { listproducts, removeproducts, addproducts, singleproducts };