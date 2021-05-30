const db = require('../config/database');
const UserModel = require("../schema/UserModel");
const TokenModel = require("../schema/TokenModel");
const PackageModel = require("../schema/PackageModel");
const HotelModel = require("../schema/HotelModel");
const TransferModel = require("../schema/TransferModel");
const TravelModel = require("../schema/TravelModel");

class DbRelation{
    createAssociation(){
        UserModel.hasMany(TokenModel, { as: "token" });
        PackageModel.hasMany(TransferModel, {foreignKey: "packageId"});
        TransferModel.belongsTo(PackageModel, {foreignKey: "packageId"});
        TransferModel.hasOne(TravelModel,{foreignKey: "transferId"});
        TravelModel.belongsTo(TransferModel,{foreignKey:"transferId"});
        TransferModel.hasOne(HotelModel, { foreignKey: "transferId" });
        HotelModel.belongsTo(TransferModel, { foreignKey: "transferId" });
        db.sync()
        //db.sync({force:true})
        .then((result) =>{
          console.log("all tables are created!")  
        }).catch((err) =>{
            console.log(`error is ${err}`)
        })   
     }
};

module.exports = DbRelation;