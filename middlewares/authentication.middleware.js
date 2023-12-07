const { validationToken } = require("../services/auth")

function checkAuthticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookeValue=req.cookies[cookieName]
        if(!tokenCookeValue)
        {
            return next()
        }
        try {
            const userPayload=validationToken(tokenCookeValue)
            req.user=userPayload 
        } catch (error) {
            console.log(error);
        }
       return next()
    }
}

module.exports={
    checkAuthticationCookie
}