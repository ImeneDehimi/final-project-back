require('dotenv').config()
// imports
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require("./router/index")

app.use(express.json())

app.use(cors())

// route
app.use("/" ,routes) 
app.get('/', (req, res)=>{
  res.send({message : "Welcome to the API"})
})

// server init::
const port = process.env.PORT || 5000
app.listen(port , ()=> console.log(`server running on port ${port}`))

// connecting to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Error connecting to database:", err));