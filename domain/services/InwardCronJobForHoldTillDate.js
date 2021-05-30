import BatchRepository from "../../repositories/BatchRepository";

import { Op } from "sequelize";

import { CronJob } from "cron";

class CronJobForBatchModel {



    batchRepository;



    constructor(batchRepository) {

        this.batchRepository = batchRepository

    }

    async execute() {

        let batchData = await this.getBatches()

        batchData = JSON.parse(JSON.stringify(batchData))

        await this.updateIsBatchOnHold(batchData)

    }

    async getBatches() {

        const todayStart = new Date().setHours(0, 0, 0, 0);

        const todayEnd = new Date().setHours(23, 59, 59, 999);

        let batchData = await this.batchRepository.findAll({

            where: {

                isBatchOnHold: true,

                holdTillDate: {

                    [Op.gt]: todayStart,

                    [Op.lt]: todayEnd

                }

            }

        });

        return batchData

    }

    async updateIsBatchOnHold(batchData) {

        let updatedBatchData = []

        batchData.map((data) => {

            data.isBatchOnHold = false

            updatedBatchData.push(data)

        })

        await this.batchRepository.bulkCreate(updatedBatchData, {

            updateOnDuplicate: ["isBatchOnHold"]

        })

    }



    static create() {

        let useCase = new CronJobForBatchModel(new BatchRepository())

        return useCase

    }

}

//set time zone if required from https://momentjs.com/timezone/

var inwardBatchCronJob = new CronJob('00 00 12 * * *', () => {

    let useCase = CronJobForBatchModel.create()

    useCase.execute()

}, null, true, 'Asia/Kolkata')

export { inwardBatchCronJob };