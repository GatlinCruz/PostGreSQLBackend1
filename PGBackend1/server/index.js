const client = require('./postgresql_db/connection.js')
const express = require('express');
const cors = require("cors");
const axios = require('axios').default;
const { json } = require('express');
const path = require('path')


const app = express();
// const corsOpts = {
//     origin: '*',
  
//     methods: [
//       'GET',
//       'POST',
//     ],
  
//     allowedHeaders: [
//       'Content-Type',
//     ],
//   };
  
//  app.use(cors(corsOpts));
// app.use(cors());
const corsOptions = {
    origin: true,
  }
  app.use(cors(corsOptions))
require('dotenv').config()
const PORT = 8080;

const getAllUsers = require("./routes/getAllUsers.js");
const getUser = require("./routes/getUser.js")
const addUser = require("./routes/addUser.js")
const login = require("./routes/login");
const getUserBlogs = require('./routes/get-user-blogs');
const getOtherBlogs = require('./routes/get-other-blogs')

app.use(json());
app.use("/", getAllUsers);
app.use("/", getUser);
app.use("/", addUser);
app.use("/", login)
app.use('/', getUserBlogs)
app.use('/', getOtherBlogs)
app.use('/', express.static(path.join(__dirname, '../public')))

app.listen(PORT, ()=>{
    console.log(`Sever is now listening at port ${PORT}`);
})

client.connect();