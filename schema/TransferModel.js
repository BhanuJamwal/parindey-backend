const Sequelize = require('sequelize');
const db = require('../config/database');

const TransferModel = db.define('transfer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    locationFrom: {
        type: Sequelize.STRING,
        allowNull: false
    },
    locationTo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
    //add this id as foreign key to hotel and travel
}
    , {
        freezeTableName: true
    });
module.exports = TransferModel;
