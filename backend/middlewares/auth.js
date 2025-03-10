
const jwt = require('jsonwebtoken')

const authuser = async (req, res,next) => {

    const {token} = req.headers;

    if(!token){
        return res.json
    }

}