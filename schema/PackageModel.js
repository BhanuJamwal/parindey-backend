const Sequelize = require('sequelize');
const db = require('../config/database');

const PackageModel = db.define('package', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    packageType: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    //themes: {
    //    type: Sequelize.ARRAY,
    //    allowNull: false
    //},
    availableFrom: {
        type: Sequelize.DATE,
        allowNull: false
    },
    availableTill: {
        type: Sequelize.DATE
    }
    //add this id as foreign key for transfer in package
}
    , {
        freezeTableName: true
    });
module.exports = PackageModel;
