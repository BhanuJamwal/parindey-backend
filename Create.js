const fs = require('fs');
const User = require("./userdata");
const MongoOperations = require('./MongoOperations');

//for updation of new row in json file add data in below line
function create(name,age,occupation,empid){
var data = new User(name, age, occupation,empid);
jsonData = data.convertToJson()
console.log(jsonData);
var mongod = new MongoOperations();
mongod.insertMongo(jsonData);
}
module.exports = create;
