const express = require('express');
const app = express();
const port = 4000;
const mongoose = require('mongoose');
const Users = require('./models/users');

require("dotenv").config({path:"./config/.env"});

const connectionDBs=async()=>{
    mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('Connected to DBs.....'))
    .catch(err=>console.log('err in the connection',err));
  }
connectionDBs();



app.get('/userpage',function(req,res){
    Users.find({}).then (function(Users){
    res.send('User list:' + Users)
    })
    .catch(err => console.log(err))
})



app.post('/newuser', function(req,res){
    Users.create().then (function(err , docs){
        if (err){
            console.log(err);
        }
        res.send(docs)
    })
}) 



app.put('/updatedpage:id', function(req,res){
   Users.FindByIdAndUpdate({_id:req.params.id},{$set:{name:req.body.name}},function(err,docs){
        if (err) {
            console.log(err);
        }
        else{
            console.log('Updated User' + docs);
          
        }
      })
})


app.delete('/deletedpage:id', function(req,res){
    var id = [{_id:req.params.id}];
Users.findByIdAndDelete(id, function (err, docs) {
    if (err){
        console.log(err)
    }
        //console.log("Deleted : ", docs);
        res.send('Deleted')
});
})



 
 

 
app.listen(port)