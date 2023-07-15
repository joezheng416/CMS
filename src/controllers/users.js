const UserModel = require("../models/user");
const { generateToken } = require("../utils/jwt");

const register = async(req,res) =>{
    const {username,password} = req.body;
    const user = new UserModel({username,password});
    await user.hashPassword();
    await user.save();
    const token = generateToken({username})
    res.status(201).json({username,token});
}

const login = async(req,res) =>{
    const {username, password} = req.body;
    const user = await UserModel.findOne({username}).exec();
    if(!user) {
        res.status(401).json({error:"invaild username or password"})
        return
    }
    if(!(await user.validatePassword(password))){
        res.status(401).json({error:"invaild username or password"})
        return
    }
    const token = generateToken({username})
    res.status(201).json({username,token});
    
}

module.exports = {
    register,
    login
}