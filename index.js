import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var newI = [];
var newWorkI = [];
var newItem = "";
var newWorkItem = "";
const date = new Date();
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekday[date.getDay()];
let currentMonth = month[date.getMonth()];
let currentDay = date.getDay();
let currentD = day+", "+currentMonth.toString()+" "+currentDay.toString();


app.get("/", function(req, res){
  res.render("index.ejs",{currentDate:currentD,newItems:newI});
});
app.get("/work", function(req, res){
  res.render("work.ejs", {newWorkItems:newWorkI});
});

app.post("/", (req, res) => {
  newItem=req.body["item"];
  newWorkItem =req.body["workItem"];
  if(newItem){
    newI.push(newItem);
    res.render("index.ejs",{currentDate:currentD,newItems:newI});
    newItem="";
  }
  if(newWorkItem){
    newWorkI.push(newWorkItem);
    res.render("work.ejs",{newWorkItems:newWorkI});
    newWorkItem="";
  }
}); 
 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
