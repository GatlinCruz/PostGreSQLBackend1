const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const client = require("../postgresql_db/connection.js");

router.post("/api/v1/users/login", (req, res) => {
    const {email, password} = req.body;
    
    client.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`, (err, result) => {
        if(!err) {
            
            var data = JSON.parse(JSON.stringify(result.rows))
            if(data.length > 0) {
                const email = data[0].email
                const id = new Date().getDate();

                //creating a token because the user has successfully signed in
                const token = jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '30d'});
                
                return res.status(200).json({"message": "Successfully signed in", "token": token, "date": id})
            }
            else {
                return res.status(404).json({"message": "user does not exist"})
            }
        }
        else {
            return res.send(err.message);
        }
    });
    client.end;
})



module.exports = router;