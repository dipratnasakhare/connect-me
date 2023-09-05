const express = require("express")
const cors = require("cors");

// Routes here 


const app = express()
app.use(cors())

app.use(express.json());


// user data routes here

// user authentication routes and admin also 

// admin dashboard routes 


app.get("/", (req, res) => {
    res.send("Welcome To Backend")
})

app.listen(4000, async ()=> {
  try{
      console.log("Connected to db")
      console.log({msg:"Your server is running at 4000 port"})
  }catch(err){
      console.log("Connection failed to db")
      console.log(err)
  }
})