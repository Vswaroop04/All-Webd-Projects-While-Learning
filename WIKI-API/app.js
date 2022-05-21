const express = require("express");

const bodyParser = require("body-parser");

const ejs = require("ejs");

const mongoose = require("mongoose");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikidb", {useNewUrlParser:true});

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")

.get(function (req,res) {
 
  Article.find(function(err,foundarticle){
    if(!err){
     res.send(foundarticle)

    }
    else{
     res.send(err)

    }

  })
 
 })
 .post(function(req,res){
    
  const newbook = new Article ({
    title: req.body.title,
    content:  req.body.content
  })
  newbook.save(function(err){
    if(err){
      console.log(err)

     }
     else{
      console.log("succesfully saved")

     }
  });
})
.delete(function(req,res){

  Article.deleteMany(function(err){
    if(!err){
      console.log("succesfully deleted")

     }
     else{
        console.log(err)

     }

  })
})

//////////Targeting a specific article

app.route("/articles/:articleTitle")

.get(function(req,res){

  Article.findOne({title:req.params.articleTitle},function(err,foundarticle){

    if(foundarticle){
      res.send(foundarticle);
    }
    else{
      res.send("No Articles Matching")
    }

  })

})

.put(function(req,res){
  Article.updateOne(
    
    {title:req.params.articleTitle},

    {title:req.body.title , content:req.body.content}, 

    {overwrite:true}, 
    
   
      function(err){
        if(err){
          console.log(err)
    
         }
         else{
          console.log("succesfully Updated")
    
         }
    })
 

})

.patch(function(req,res){

  Article.updateOne(
    
    {title:req.params.articleTitle},

    {$set:req.body},

    function(err){

     if(!err){
       res.send("succesfully updated")

     }
     else{
       res.send(err)
     }
    }
  )
  
  })

.delete(function(req,res){
  Article.deleteOne(

    {title: req.params.articleTitle},
    function(err){

      if(!err){
        res.send("succesfully Deleted")

      }
      else{
        res.send(err)
      }
    }
  )
})




app.listen(3000, function(){

    console.log ("Server Started");
});
