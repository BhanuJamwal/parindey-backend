var fs = require('fs');
//const MongoOperations = require('./MongoOperations');
const PostgresOperations = require('./PostgresOperations')
function deleteJson(id){
//var mongod = new MongoOperations;
//mongod.deleteMongo(id);
var dbOperation = new PostgresOperations();
dbOperation.deletePostgres(id) 
}
module.exports = deleteJson;
