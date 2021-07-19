const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {myQuery} = require("../db/db");
const { usersOnly,login } = require("../middleweres/verify");



router.post("/register", async (req, res) => {
  const { username, password, f_name, l_name } = req.body;
  // check missing info
  if (!username || !password || !f_name || !l_name) {
    return res.status(400).send("missing some info");
  }
  // username taken
  const usernameInDB = await myQuery(`SELECT username FROM vacations_project_v1.users;`)
  const index = usernameInDB.findIndex(user=> user.username == username)
  if (index != -1) {
    return res.status(400).send("username is taken");
  }
  // encrypt the password
  const hashedPass = await bcrypt.hash(password, 10);


  // save the user
  await myQuery(  `INSERT INTO users (f_name, l_name,  username, password, role)
  VALUES ("${f_name}","${l_name}", "${username}","${hashedPass}", "user")`)


  //   // send response
  res.send()
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // check missing info
  if (!username || !password) {
    return res.status(400).send("missing some info");
  }
  const usersInDB = await myQuery(`SELECT * FROM vacations_project_v1.users;`)
  const index = usersInDB.findIndex(user=> user.username == username)
  if (index == -1) {
    return res.status(400).send("user not found");
  }
const user = usersInDB[index]


  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("wrong password");
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      fname: user.f_name,
      lname: user.l_name,
      role: user.role
    },
    process.env.TOKEN_SECRET,
    {
        expiresIn:"20m"
    }
  );


  res.send({token, username: user.username, role: user.role})

});

router.get("/users", async (req, res) => {
  const users = await myQuery(`SELECT username FROM vacations_project_v1.users;`)
  res.send(users)
})


router.get("/check", login ,async (req, res) => {
  res.send({user_id: req.user.user_id,
            username:req.user.username ,
            role:req.user.role})
})



module.exports = router;
