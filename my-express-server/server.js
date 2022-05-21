
const express = require("express");

const app = express();

app.get("/", function (req,res) {

      res.send("hello");
    
    })

    app.get("/About", function (req,res) {

        res.send("<h1> Hi my name is vishnu </h1>");
      
      })

app.listen(3000, function(){

    console.log ("Server Started");
});
