const PackageModel = require("../../../schema/PackageModel");
//const DataBaseQuery = require("../../../databaseOperations/dataBaseQuery");
const TransferModel = require("../../../schema/TransferModel");
class CreatePackage {
    constructor(request, response, packageModel){
        this.request = request
        this.response = response
        this.packageModel = packageModel
    }
    async execute(){
        try {
            //let db = new DataBaseQuery(this.request, this.packageModel)
            //db.create()
            const addPackage = await this.packageModel.create(this.request.body)
            //for (let transfer of this.request.body.transfer){
            //await addPackage.setTransfers(this.request.body.transfer)
            //}
            for (let transfer of this.request.body.transfer){
                const addTransfer = await TransferModel.create(transfer)
                await addTransfer.setPackage(addPackage)
                await addTransfer.setTravel(transfer.travelType)
                await addTransfer.setHotel(transfer.stay)
            }
            return {code: 200, message: `Package created Successfully!`}


        } catch (error) {
            throw error;
        }
    }
    static create(request, response){
        let useCase = new CreatePackage(request, response)
        return useCase
    }
}
module.exports = CreatePackage;