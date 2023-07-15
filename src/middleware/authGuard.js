const { validate } = require("../models/user");
const { validateToken } = require("../utils/jwt");

module.exports = (req,res,next) => {
    const authorization = req.header("Authorization");
    if(!authorization) {
        res.status(401).json({error: "missing authorization"})
        return
    }
    const tokenArray = authorization.split(" ")
    if(tokenArray.length !==2){
        res.status(401).json({error:"invaild authorization token format"})
        return
    }
    try{
        const payload = validateToken(tokenArray[1])
        req.user = payload
        next()
    } catch (e) {
        res.status(401).json({error:"invalid token"})
        return
    }
}