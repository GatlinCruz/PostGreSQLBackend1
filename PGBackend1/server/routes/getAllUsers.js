const express = require("express");

const router = express.Router();
const client = require("../postgresql_db/connection.js");

router.get("/api/v1/users/get-all-users", (req, res) => {
    console.log("Herer")
    client.query(`Select * from users`, (err, result) => {
        if(!err) {
            return res.send(result.rows);
            //res.send("herere")
        }
        else {
            return res.send(err.message);
            //res.send("there")
        }
    });
    client.end;
})
//client.connect();

router.get("/api/v1/users/get-all-usersss", (req, res) => {
    var id = "abcdefghijklmnopqrstuvwxyz";
    var s = id.substring(0, id.length - 4);
    var c = id.replace(s, ("*".repeat(s.length)) );
    console.log('HERRRR')
    //res.send(`<h1>${c}</h1>`)
    res.send("Here")
})
module.exports = router;