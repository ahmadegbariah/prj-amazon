const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HPvU9DFg5koCdLGeOEiFvwHat4v8eMjX6SY0YCwxPBQBUPhKy1fPVhiSM5cQtgW7QBG9ydQcXnW57TDxVE2f3H000HSfmEQZF"
);

// API

// - App config
const app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb');

var personSchema = mongoose.Schema({
  id: String,
  password:String
});
var Person = mongoose.model("Person", personSchema);





// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/login", (request, response) => response.status(200).send("hello world"));

app.post('/', function(req, res){
  var personInfo = req.body; //Get the parsed information
  
  if(!personInfo.name || !personInfo.age || !personInfo.nationality){
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});
  } else {
     var newPerson = new Person({
        email: personInfo.email,
        password: personInfo.password,
        nationality: personInfo.nationality
     });
   
     newPerson.save(function(err, Person){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else
           res.render('show_message', {
              message: "New person added", type: "success", person: personInfo});
     });
  }
});




// - Listen command
exports.api = functions.https.onRequest(app)

app.listen(3001);