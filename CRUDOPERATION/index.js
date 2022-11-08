
  
const express = require("express");
const bodyParser = require("body-parser");
 
const mongoose = require("mongoose");
const multer = require("multer")

const app = express();
const  route  = require("./routers/route")

const dotenv = require("dotenv")
dotenv.config();


 
//------------------- Global or Application level Middleware-------------------//
app.use(bodyParser.json());
app.use(multer().any()); 
app.use(bodyParser.urlencoded({ extended: true }));

//------------------- Connection Establishment Between Application and Database -------------------//
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true,})
  .then(() => console.log("MongoDb is connected!"))
  .catch((err) => console.log(err));
  

 //  --------middleware---------- 
app.use(express.json());



app.use("/", route);

app.post("/done", async (req,res)=>{
    res.send("done")
})



app.use("*", (req, res) => {
  return res
    .status(400)
    .send({ status: false, message: "please enter valid url endpoint" });
});

//------------------- Server Configuration -------------------//

app.listen(process.env.PORT || 8000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8000))
});