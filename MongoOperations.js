const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('./config');

const info = config;
const url = `mongodb://${info.db.username}:${info.db.password}@${info.db.host}:${info.db.port}`;


class MongoOperations {

    insertMongo (data) {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                throw err;
            }else {
            console.log("Database created!");
            const db = client.db(info.db.database);
            db.collection(info.db.table).insertOne(data).then(() =>{
                if (err) {
                    throw err;
                }else {
                    console.log("record_inserted");
                    db.close;
                }
            });
            }
        });
    }
    updateMongo(data) {
        MongoClient.connect(url, (err, client) => {
            if (err) {
                throw err;
            } else {
                console.log("Database created!");
                const db = client.db(info.db.database);
                db.collection(info.db.table).updateOne({ "empid": data.empid }, { $set: { "Name": data.Name, "Age": data.Age, "Occupation": data.Occupation }, $currentDate: { lastModified: true }}).then(() => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("record_inserted");
                        db.close;
                    }
                });
            }
        });
    }
    deleteMongo(id) {
        const client = MongoClient.connect(url, (err, client) => {
            if (err) {
                throw err;
            } else {
                console.log("Database created!");
                const db = client.db(info.db.database);
                db.collection(info.db.table).deleteOne({empid: id}).then(() => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("record_deleted");
                        db.close;
                    }
                });
            }
        
        });
    }
    readMongo(res){
        MongoClient.connect(url, (err, client) => {
            const db = client.db(info.db.database);
            db.collection(info.db.table).find({}).toArray().then((result) => {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ "table": result }));
                }
            });
        });
    }
    readSingleMongo(res,id) {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(info.db.database);
            db.collection(info.db.table).find({where:{id:id}}).toArray().then((result) => {
                if (err) {
                    throw err;
                } else {
                    console.log(result);
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.sendFile(path.join(__dirname, "templates", "update.html"), {user:json.stringify({result:result})})
                }
            });
        });
    }
    
}
module.exports = MongoOperations;
