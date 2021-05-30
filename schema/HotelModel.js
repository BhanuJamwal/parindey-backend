const Sequelize = require('sequelize');
const db = require('../config/database');

const hotelModel = db.define('hotel', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    levelOfStar: {
        type: Sequelize.NUMBER
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
}
    , {
        freezeTableName: true
    });
module.exports = hotelModel;
