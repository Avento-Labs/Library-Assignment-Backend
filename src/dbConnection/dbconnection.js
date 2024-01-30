const config = require("../../configure");
const {Sequelize} = require("sequelize");
///creaetes a connnection with database
let database = new  Sequelize(config.db);

database.authenticate().then(()=>{
    console.log("Database Connected");

}).catch((err) =>{
    console.log(err);
});

module.exports = database;