var fs = require('fs');
const MongoOperations = require('./MongoOperations');
function deleteJson(id){
var mongod = new MongoOperations;
mongod.deleteMongo(id);
}
module.exports = deleteJson;
