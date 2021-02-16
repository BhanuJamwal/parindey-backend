const {Sequelize, DataTypes, Op} = require('sequelize');
const config = require('./config');

const info = config;

const url = `postgres://${info.db.username}:${info.db.password}@${info.db.host}:${info.db.port}/${info.db.database}`;

const sequelize = new Sequelize(url);
const user = sequelize.define('User',{name:{type: DataTypes.STRING,allowNull:false}, age:{type: DataTypes.INTEGER,allowNull:false}, occupation: {type: DataTypes.STRING, allowNull: false}, empid: {type: DataTypes.TEXT,allowNull: false}});
user.sync()

class PostgresOperations {
    
    async readPostgres(res){
        const persons = await user.findAll();
        console.log(persons);
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify({"table": persons}));
    }
    async updatePostgres(data){
        const person = user.update({name: data.Name, age: data.Age, occupation: data.Occupation},{where:{empid: data.empid}})
        //await person.save()
    }
    async createPostgres(data){
        const person = user.build({name: data.Name, age: data.Age, occupation: data.Occupation, empid: data.empid})
        await person.save()
    }
    async deletePostgres(id){
        await user.destroy({
            where: {
                empid: id
            }
        });
    }
}
module.exports = PostgresOperations; 