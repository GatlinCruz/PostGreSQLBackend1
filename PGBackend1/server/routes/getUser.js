const express = require("express");
const router = express.Router();
const client = require("../postgresql_db/connection.js");

router.get("/api/v1/users/get-user/:email", (req, res) => {
    const id = req.params.email;
    client.query(`Select * from users WHERE email='${id}'`, (err, result) => {
        if(!err) {
            
            var a = JSON.stringify(result.rows)
            var b = JSON.parse(a);
            if(b.length > 0) {
                var first_name = b[0].first_name
                var last_name = b[0].last_name
                var email = b[0].email
                return res.send(`<h1>Hello my name is ${first_name} ${last_name} and my email address is ${email}</h1>`);
            }
            else {
                return res.json({"message": "invalid user", "code" : 404})
            }
        }
        else {
            return res.send(err.message);
        }
    });
    client.end;
})

router.get("/api/v1/users/get-partial-user/:email", (req, res) => {
    const id = req.params.email;
    client.query(`Select * from users WHERE email='${id}'`, (err, result) => {
        if(!err) {
            
            var a = JSON.stringify(result.rows)
            var b = JSON.parse(a);
            const user = b.map((u) =>{
                const {user_id, last_name } = u;
                return {id, last_name}
            })

            return res.send(`Hello Mr. ${user[0].last_name}`)
            
        }
        else {
            return res.send(err.message);
        }
    });
    client.end;
})

module.exports = router;