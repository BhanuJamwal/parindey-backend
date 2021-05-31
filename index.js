const fs = require('fs');
const path = require('path');
const http = require('http');
const create = require("./Create");
const update = require("./update");
var readData = require("./read");
const deleteJson = require("./delete");
var bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");

const app = express();
const PostgresOperations = require('./PostgresOperations');
const  db  = require('./config/database');
const authRoutes = require("./api/auth/routes");
const packageRoutes = require("./api/packages/routes");
const authenticateToken = require("./api/auth/middleware/LoginRequired");
//const {inwardBatchCronJob} = require("./domain/services/InwardCronJobForHoldTillDate");

const DbRelation = require('./databaseOperations/DbRelation');
app.use(express.static(__dirname + '/templates'));
app.use(cors())
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

new DbRelation().createAssociation()

//inwardBatchCronJob.start()


app.use('/auth', authRoutes);
app.use('/home', packageRoutes);

app.get('/', authenticateToken,(req, res) => {
    res.sendFile(path.join(__dirname,'templates','home.html'),{title:'hey you'})

});
//app.use('/auth', authRoutes);

app.get('/create', (req, res) =>{
    res.sendFile(path.join(__dirname,"templates","create.html"))
});
app.get('/update/:empid', (req, res) => {
    var db = new PostgresOperations();
    db.readOne(res,req.params.empid);
    //res.sendFile(path.join(__dirname,"templates","update.html"))
});
app.post('/createForm', (req, res) =>{
    console.log("request"+ req.body.name);
    create(req.body.name, req.body.age, req.body.occupation, req.body.empid);
    res.sendFile(path.join(__dirname,"templates","file.html"))
});
app.post('/updateForm',(req, res) => {
    console.log("request"+ req.body.name);
    update(req.body.name, req.body.age,req.body.occupation,req.body.empid);
    res.sendFile(path.join(__dirname,"templates","file.html"))
});
app.get('/read', (req, res) =>{
    readData(res);
});
app.get('/delete/:id', (req, res) =>{
    deleteJson(req.params.id)
    //res.sendFile(path.join(__dirname,"templates","delete.html"))
    res.sendFile(path.join(__dirname, "templates", "file.html"))
});


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

