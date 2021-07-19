const router = require("express").Router();
const {myQuery} = require("../db/db");
const {usersOnly, adminOnly} = require("../middleweres/verify")



router.put("/", usersOnly,async(req,res)=>{
    try {
        const {vacation_id} = req.body 
        const test = await myQuery(`SELECT * FROM u_v WHERE user_id = ${req.user.user_id} AND vacation_id = ${vacation_id}`)
        if (test.length == 1) {
            const unfullow = await myQuery(`DELETE FROM vacations_project_v1.u_v where user_id = ${req.user.user_id} AND vacation_id = ${vacation_id};`)
            const number = await myQuery(`SELECT follower FROM vacations WHERE vacation_id = ${vacation_id};`)
            const numberToQ = number[0].follower
            const unfullow2 = await myQuery(`UPDATE vacations SET follower = ${numberToQ - 1} WHERE vacation_id = ${vacation_id};`)
        } else if (test.length == 0) {
            const fullow = await myQuery(`INSERT INTO u_v (user_id, vacation_id) VALUES (${req.user.user_id},${vacation_id});`)
            const number = await myQuery(`SELECT follower FROM vacations WHERE vacation_id = ${vacation_id};`)
            const numberToQ = number[0].follower
            const unfullow2 = await myQuery(`UPDATE vacations SET follower = ${numberToQ +1} WHERE vacation_id = ${vacation_id};`)
        }
        res.send(test)
    } catch (error) {
        res.send(error)
    }


})




module.exports = router;
