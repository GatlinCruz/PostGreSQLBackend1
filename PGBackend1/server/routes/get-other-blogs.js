const express = require("express");
const router = express.Router();
const client = require("../postgresql_db/connection.js");

router.get("/api/v1/blogs/get-other-blogs/:email", (req, res) => {
    var id = req.params.email;
    id = id.slice(1);
    
    client.query(`Select * from blogs WHERE email<>'${id}' ORDER BY timestamp DESC`, (err, result) => {
        if(!err) {
            var a = JSON.stringify(result.rows)
            var b = JSON.parse(a);
            if(b.length > 0) {
                var blogs = '['
                for(var i = 0; i < b.length - 1; i++) {
                    blogs += `{ "blog" : "${b[i].blog}", "timestamp": "${b[i].timestamp}" }, `
                }
                blogs += `{ "blog" : "${b[b.length - 1].blog}", "timestamp" : "${b[b.length - 1].timestamp}" } `
                blogs += "]"
                
                return res.json(JSON.parse(blogs))
            }
            else {
                return res.json([{"message": "success"}, {"blogs" : []}])
            }
        }
        else {
            return res.send(err.message);
        }
    });
    client.end;
})

module.exports = router;