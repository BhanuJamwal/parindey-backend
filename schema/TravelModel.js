const Sequelize = require('sequelize');
const db = require('../config/database');
const { binary } = require('joi');
//import { errorMessages } from '../domain/customMessages/Constants';

const TravelModel = db.define('travel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
}
    , {
        freezeTableName: true
    });
module.exports = TravelModel;
