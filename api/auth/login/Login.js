const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require("../../../schema/UserModel");
const TokenModel = require("../../../schema/TokenModel");
const dotenv = require("dotenv");
dotenv.config();

class Login {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    };
    async authenticate() {
        console.log(this.request.body)
        const phoneNumber = this.request.body.phoneNumber;
        const password = this.request.body.password;
        const user = await UserModel.findOne({ where: { phoneNumber: phoneNumber } }, { include: { model: TokenModel, as: 'token' }})
        console.log(`user ${user}`)
        if (user !== null){
            console.log('vvvvvvvvvvvvvvvvvv')
            const hash = user.dataValues.password
            const hashString = hash.toString()
            console.log(`hash pass ${hashString}`)
            //if (phoneNumber == user.dataValues.phoneNumber) {
            const signal = bcrypt.compareSync(password, hashString)
            if (signal) {
                const tokenData = await user.getToken();
                if (tokenData.length > 0){
                    await TokenModel.destroy({where:{userId: user.dataValues.id}})
                }
                const token = this.generateToken(phoneNumber);
                const addToken = await TokenModel.create({"token":token})
                await user.setToken(addToken);
                console.log("above return")
                this.response.send({ code: 200, token: token, data: await user.getToken() })
            } else {
                this.response.send({code: 400, message:"password do not match"})
            }
        }else{
            console.log('bbbbbbbbbbbbbbb')
            this.response.send({code:400, message: "user don't exists for provided number and password!"})
        }
    };

    generateToken(phoneNumber){
        return jwt.sign({ data: phoneNumber}, process.env.TOKEN_SECRET);
    };
};

module.exports = Login;