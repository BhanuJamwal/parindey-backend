const Sequelize = require('sequelize');
const db = require('../config/database');

const UserModel = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR(60,true),
        allowNull: false
    }
}, {
    freezeTableName: true
});
//userModel.sync({force:false})
module.exports = UserModel;
