const fs = require('fs');
const path = require('path');
const http = require('http');
const create = require("./Create");
const update = require("./update");
var readData = require("./read");
const deleteJson = require("./delete");
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'templates','home.html'))

});
app.get('/create', (req, res) =>{
    res.sendFile(path.join(__dirname,"templates","create.html"))
});
app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname,"templates","update.html"))
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
app.get('/delete', (req, res) =>{
    res.sendFile(path.join(__dirname,"templates","delete.html"))
});
app.post('/deleteForm', (req, res) => {
    deleteJson(req.body.empid);
    res.sendFile(path.join(__dirname,"templates","file.html"))
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

