const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
require("./db/db")

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()


app.use("/auth", require('./route/auth'))
app.use("/vacations", require('./route/vacations'))
app.use("/follower", require('./route/follower'))


app.get("/", (req,res)=>{
    res.send("blah")
})






app.listen(1000,()=>{console.log("running on port 1000");})