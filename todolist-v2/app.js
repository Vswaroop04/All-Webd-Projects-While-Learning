const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const _ = require("lodash");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("publlic"));

mongoose.connect( "mongodb://localhost:27017/todolistDB", {useNewUrlParser : true} );



const itemschema = {
    name : String 
};

const item = mongoose.model("item", itemschema)

const listschema = {
   name : String,
   items : [itemschema]
}; 

const List = mongoose.model("List",listschema)

const item1 = new item ({
    name : "Welcome to todolist"
})
const item2 = new item ({
    name : "Hit the + button to add new item"
})

const item3 = new item ({
    name : " <--- Hit this button to delete a item"
})

const defaultitems = [item1,item2,item3] ; 



app.set('view engine', 'ejs');



app.get("/", function(req,res){

// here we were storing newly created things in found items array by call back function

// find will search for every thing in database and stores it in found items

item.find({},function(err,founditems){

    if(founditems.length==0){ 


        item.insertMany ( defaultitems , function(err) {
   
            if(err ) {
                console.log (err);
            }
         else {
        
            console.log ("succesfully saved items into db")
         }
        } ) ;
        
        

    }

    res.render("list", {kindofday: "today" , newListItem:founditems });


} )


    let day = date.getDate();


})



app.get("/:topic",function(req,res){

  
    const title = _.lowerCase(req.params.topic) ;


    List.findOne(  { name:title } , function(err,listitems){

        if(!err){

            if (!listitems){
                
    const list = new List ({

        name : title,
        items : defaultitems

    });
            
            list.save();
            res.redirect("/" + title);
       
        
        }
        else{
            res.render("list", {kindofday: listitems.name , newListItem: listitems.items });

                       }
       
                        }
        
      
   })
   
});

app.post("/",function(req,res){


 var itemname = req.body.newItem ;

 var listname = req.body.list ;

 console.log(listname);

 const items = new item({

    name:itemname
  }); 

 if (listname === "today") {
   
      
      items.save();
       
      res.redirect("/");

 }
else{

  List.findOne({name:listname}, function(err,foundlist){

    foundlist.items.push(items);
    foundlist.save();
    res.redirect("/"+listname);


  } )
     

    
}

})

app.listen(3000,function(){

    console.log("Server Started");

})