

const jwt = require('jsonwebtoken')

const adminAuth = async (req, res, next) => {

    try {
        const { token } = req.headers

        if (!token) {
            return res.json({ success: false, message: "Not Authorised Login Again" })
        }

        const tokendecode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (tokendecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorised Login Again" })
        }

        next()

    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }

}

module.exports = adminAuth