const jwt=require("jsonwebtoken")

const secret="Malik786"

function createToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    }
    const token =jwt.sign(payload,secret)
    return token
}

function validationToken(token){
    const payload=jwt.verify(token,secret)
    return payload
}

module.exports={createToken,validationToken}