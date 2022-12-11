const express = require("express");

const app = express();
 app.all("ping",ping,(req,res)=>{
    res.json("Ping")
 })

 app.post('')