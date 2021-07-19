const router = require("express").Router();
const jwt = require("jsonwebtoken");
const {myQuery} = require("../db/db");
const {usersOnly, adminOnly} = require("../middleweres/verify")



router.get("/", usersOnly,async(req,res)=>{
    const followerVacations = await myQuery(`SELECT * FROM u_v JOIN vacations ON u_v.vacation_id=vacations.vacation_id 
    WHERE user_id = ${req.user.user_id};`)
    let followArr = []
    followerVacations.map(vac=> followArr.push(vac.vacation_id))
    const allVacations = await myQuery(`SELECT * FROM vacations_project_v1.vacations;`)
    let allVactionArr = []
    allVacations.map(vac=> allVactionArr.push(vac.vacation_id))
    const allVaction = followArr.concat(allVactionArr)
    const sortedArr = [...new Set(allVaction)];
    let finelVacationArr = []
    const vacationFun = async ()=>{
        for (let i = 0; i < sortedArr.length; i++) {
            let vac = await myQuery(`SELECT * FROM vacations_project_v1.vacations 
                WHERE vacation_id = ${sortedArr[i]};`)
            finelVacationArr.push(vac[0])
        }
    }
    await vacationFun()
    res.send(finelVacationArr)

})

router.post("/", adminOnly,async (req, res) => {
    try {
        const {  v_description, destination, img_url, date_start, date_end, price } = req.body;
    // check missing info
    if ( !v_description|| !destination || !img_url|| !date_start|| !date_end|| !price) {
      return res.status(400).send("missing some info");
    }

    // save the vaction
    await myQuery(  `INSERT INTO vacations ( v_description, destination ,img_url, date_start, date_end, price)
    VALUES ("${v_description}", "${destination}" ,"${img_url}", "${date_start}", "${date_end}", ${Number(price)})`)
  
     // send response
    res.send()
    } catch (error) {
        res.send(error)
    }
    
  });

  router.delete("/", adminOnly,async(req,res)=>{
      try {
          const {vacation_id} =req.body
          await myQuery(`DELETE FROM u_v Where vacation_id = ${vacation_id};`)
          await myQuery(`DELETE FROM vacations Where vacation_id = ${vacation_id};`)
          res.send()
      } catch (error) {
          res.send(error)
      }
})

router.put("/", adminOnly,async (req, res) => {
    try {
        const { vacation_id, v_description, destination, img_url, date_start, date_end, price } = req.body;
    // check missing info
    if (!vacation_id|| !v_description|| !destination|| !img_url|| !date_start|| !date_end|| !price) {
      return res.status(400).send("missing some info");
    }

    // save the vaction
    await myQuery(  `UPDATE vacations
    SET v_description = "${v_description}", destination = "${destination}", img_url = "${img_url}", date_start = "${date_start}", date_end = "${date_end}", price= ${Number(price)}
    WHERE vacation_id = ${vacation_id};`)
    
  
     // send response
    res.send()
    } catch (error) {
        res.send(error)
    }
    
  });

  router.get("/myvacations", usersOnly,async(req,res)=>{
    const myVacations = await myQuery(`SELECT vacation_id FROM u_v
    WHERE user_id = ${req.user.user_id};`)
    const data = []
    myVacations.map(vac=> data.push(vac.vacation_id))
    res.send(data)

})




module.exports = router;
