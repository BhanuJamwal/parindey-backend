const Joi = require("joi")
const userValidation = require("./registrationValidation");
const HttpError = require("standard-http-error");
const dataBaseQuery = require("../../../databaseOperations/dataBaseQuery");
const userModel = require("../../../schema/UserModel");
const { response } =require("express");
const bcrypt = require('bcrypt');

class Register{
    constructor(request,response){
        this.request = request
        this.response = response
    };
    validation(){
        try {
            const {error} = userValidation.validate(this.request.body, { allowUnkonwn: true, abortEarly: false })
            console.log("error joi ======>", error);
            if (error) {
                this.response.status(400).json({"error": error.details[0].message});
            }
        } catch (error) {
            throw error;
            
        }
    }
   async add(){
        try {
            const saltRounds = 10
            const hash = bcrypt.hashSync(this.request.body.password, saltRounds)
            console.log("yup",hash)
            this.request.body.password = hash
            //this.request.body.confirmPassword = hash
            console.log("jghgchfghghghfg")
            const userTable = new dataBaseQuery(userModel, this.request);
            userTable.create()
            console.log("kjhghjhjh")
            this.response.status(200).json({"message": "user added successfully"})
        } catch (error) {
            this.response.status(400).json({"error": error})
        }
    }


}
module.exports = Register;