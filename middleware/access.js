// const { statements } = require("../../data/statements");

exports.can =
	(...roles) =>
	(req, res, next) => {
        if (roles.length === 1 && roles[0] === "any") {
			return next ? next() : true
		}
        else{
            let check = false
            if(roles.includes(req.user[0].roleName)) {
                return next ? next() : true
            }
            else {
                return res
                ? res.status(200).json({
                        errors: [],
                        type: "authorization",
                        message: "Таны эрх хүрэхгүй байна",
                        status: "failed"
                  })
                : false
            }

        }
        
	}

exports.roles = {
	superAdmin: "super-admin",
	admin: "admin",
	user: "user",
    any: "any",
}
exports.errorReponse = {
	errors: [],
	type: "authorization",
	message: "Эрх хүрэхгүй байна",
	status: "failed"
}
