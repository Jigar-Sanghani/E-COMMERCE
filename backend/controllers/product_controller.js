const { v2: cloudinary } = require('cloudinary');

const listproducts = async (req, res) => {

}

const removeproducts = async (req, res) => {

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
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url;
            })
        )


        console.log(name, description, price, category, subcategory, sizes, bestseller);

        console.log(imageurl);

        res.json({})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

const singleproducts = async (req, res) => {

}

module.exports = { listproducts, removeproducts, addproducts, singleproducts };