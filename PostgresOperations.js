const {Sequelize, DataTypes, Op} = require('sequelize');
const config = require('./config');
const path = require('path');
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
    async readOne(res,id){
        const selected_user = await user.findAll({where:{empid:id}});
        var orig_user = selected_user[0].dataValues;
        console.log(orig_user.name,orig_user.age, orig_user.occupation,orig_user.empid);
        res.render(path.join(__dirname, "templates", "update.html"), { name:orig_user.name,age:orig_user.age,occupation:orig_user.occupation,empid:orig_user.empid});
    }
}
module.exports = PostgresOperations; 