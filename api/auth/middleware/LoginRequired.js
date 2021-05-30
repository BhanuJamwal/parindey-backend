const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const TokenModel = require("../../../schema/TokenModel");
const errorMessages = require("../../../domain/customMessages/messages");
dotenv.config();

async function authenticateToken(req, res, next) {
    console.log("inside authenticate token")
    const authHeader = req.headers.authorization
    const token = authHeader || authHeader.split(' ')[1]
    console.log("cancel", authHeader, "===========",token)
    if (token == null) {
        console.log("inside token null")
        return res.status(401).json({"error": "token is null"})
    }else{
        console.log("inside token null else")
        tokenInDb = await TokenModel.findOne({where:{token: token}})
        console.log("-------")
        console.log(tokenInDb)
        if (tokenInDb) {
            console.log(tokenInDb)
            console.log("++++++++")
            jwt.verify(token, process.env.TOKEN_SECRET,(error,user)=>{
                if (error) {
                    res.status(400).json({"data":"invalid token!"})
                }else{
                    next()
                }
            });
            console.log("===========")
        } else {
            res.status(400).json({"error": "invalid token !"})
        }
    }
}

module.exports = authenticateToken;