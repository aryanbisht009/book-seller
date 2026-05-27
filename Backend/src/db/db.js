const mysql2=require("mysql2");


// connection Pool
const db=mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"book store",
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

module.exports=db;