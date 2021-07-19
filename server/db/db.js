// connect to the database
const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"vacations_project_v1",
    timezone: "Z"
})

connection.connect(err=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connected to mySql");
    }
})

myQuery = (q)=>{
    return new Promise((resolve,reject)=>{
        connection.query(q,(err,results)=>{
                    if (err) {
                        reject(err);
                    }else{
                        resolve(results);
                    }
                })
    })
}



module.exports={myQuery}