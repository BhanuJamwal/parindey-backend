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
        const phoneNumber = this.request.body.phoneNumber;
        const password = this.request.body.password;
        const user = await UserModel.findOne({ where: { phoneNumber: phoneNumber } }, { include: { model: TokenModel, as: 'token' }})
        const hash = user.dataValues.password
        const hashString = hash.toString()
        if (phoneNumber == user.dataValues.phoneNumber) {
            const signal = bcrypt.compareSync(password, hashString)
            if (signal) {
                const tokenData = await user.getToken();
                if (tokenData.length > 0){
                    await TokenModel.destroy({where:{UserId: user.dataValues.id}})
                }
                const token = this.generateToken(phoneNumber);
                const addToken = await TokenModel.create({"token":token})
                await user.setToken(addToken);
                this.response.status(200).json({ "token": token,"data": await user.getToken() })
            } else {
                this.response.status(400).json({"message":"password do not match"})
            }

        }
    };

    generateToken(phoneNumber){
        return jwt.sign({ data: phoneNumber}, process.env.TOKEN_SECRET);
    };
};

module.exports = Login;