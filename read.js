const fs = require('fs');
//const MongoOperations = require('./MongoOperations');
const PostgresOperations = require('./PostgresOperations');
function readData (res) {
//var mongod = new MongoOperations;
//var data = mongod.readMongo(res);
var dbOperation = new PostgresOperations();
var data = dbOperation.readPostgres(res);
console.log("read successful!");
}
module.exports = readData;


