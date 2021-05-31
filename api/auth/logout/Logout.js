/*
const TokenModel = require("../../../schema/TokenModel");


class Logout {
    constructor(request, response){
        this.request = request,
        this.response = response
    }
    expireToken(){
        const userId = this.request.params.userId;
        const currentTime = new Date()
        TokenModel.update({"expiryTime":currentTime},{where:{UserId: userId}})
        //return {code:200, data: "logged out successfully"}
        console.log("hello    ----------------")
        this.response.status(200).json({"data":"logged out!"})
    }
}
module.exports = Logout;
*/
// ** will manage with react-redux 