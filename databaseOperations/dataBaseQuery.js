const db = require("../config/database");
//import userModel requ("../schema/userModel");

class dataBaseQuery{
    constructor(Model, request){
        this.model = Model
        this.request = request
    }
    async create(){
        await this.model.create(this.request.body);

    };
    async fetchAll(){
        return await this.model.findAll({where:{phoneName:this.request.phoneName}});
    };

}
module.exports = dataBaseQuery;