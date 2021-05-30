const Sequelize = require('sequelize');
const db = require('../config/database');

const TokenModel = db.define('token', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
, {
    freezeTableName: true
});
module.exports = TokenModel;
