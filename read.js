const fs = require('fs');
const MongoOperations = require('./MongoOperations');

function readData (res) {
var mongod = new MongoOperations;
var data = mongod.readMongo(res);
console.log("read successful!");
}
module.exports = readData;


