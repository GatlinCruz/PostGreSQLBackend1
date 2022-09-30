const express = require("express");
const router = express.Router();
const client = require("../postgresql_db/connection.js");

router.post('/api/v1/users/add-user', (req, res)=> {
    const {email, password, first_name, last_name, dob, is_admin, gender} = req.body;
    
    let insertQuery = `insert into users(email, password, first_name, last_name, dob, is_admin, gender) 
                       values('${email}', '${password}', '${first_name}', '${last_name}', '${dob}', ${is_admin}, ${gender})`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ 
            res.send(err.message);
        }
    })
    client.end;
})

module.exports = router;