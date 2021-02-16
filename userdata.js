const fs = require("fs");
const path = require("path");

class User{
    constructor(name, age, occupation, empid){
        this.name = name;
        this.age = age;
        this.occupation = occupation;
        this.empid = empid;
    }
    convertToJson(){
        var data = {"empid": this.empid, "Name": this.name, "Age": this.age, "Occupation": this.occupation}
        return data;
    }
}
module.exports = User;
