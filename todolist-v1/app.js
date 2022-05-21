const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("publlic"));

app.set('view engine', 'ejs');

items = ["Cook Food" , "Eating Food"];


app.get("/", function(req,res){

    let day = date.getDate();

res.render("list", {kindofday: day , newListItem:items });

})

app.post("/",function(req,res){

 var item = req.body.newItem ;

items.push(item);

res.redirect("/");

})







app.listen(3000,function(){

    console.log("Server Started");

})