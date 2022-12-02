const jwtSecret = process.env.SECRET
const jwt = require("jsonwebtoken")
const userData = require("../data/users");
const {
    getUserByUserEmail} = require("./../data/users");
exports.auth = async (req, res, next) => {
    try{
        let token = ""
        // console.log(req)
        if(req.cookies && req.cookies.jwt){
            token = req.cookies.jwt
        }
        else{
            const decodedCookie = decodeURIComponent(req.headers.authorization);
            if (!decodedCookie) throw "no auth token cookie in header"
            const start = decodedCookie.indexOf("Bearer ")
            token = decodedCookie.slice(start + 7, decodedCookie.length)
        }
        if(token) {
         const edcode = jwt.verify(token, process.env.SECRET)
         const foundUser = await userData.getUserByUserEmail(edcode.username)
         if(!foundUser){
            return res.status(200).json({
                message: "Систэмд нэвтрээгүй байна !!!",
                status: "failed",
                type: "authentication"
            })
         }
        req.token = token
        req.user = foundUser
         return next ? next() : true
        }
        else {
            return res.status(200).json({
                message: "Систэмд нэвтрээгүй байна !!!",
                status: "failed",
                type: "authentication"
            })
        }
    }
    catch (e) {
		console.log(e)
		return res.status(200).json({
			message: "Систэмд нэвтрээгүй байна !!!",
			status: "failed",
			type: "authentication"
		})
    }

}