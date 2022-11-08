
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const User = require("../models/User");
const router = require("express").Router();
const uploadFile= require("../aws/aws")
const {isValid,isValidObjectId,isValidRequestBody,isValidPassword,isValidFiles,} = require("../validator/validate") 



//post api
router.post("/register", async(req,res)=>{
  try{
 
    //---------------Name validation -----------------//
    if(!req.body.Name ){return  res.status(201).send("please enter name")}
    if(!/^[a-zA-Z]{2,}$/.test(req.body.Name)){return res.status(400).send({status:false,message:" name is not in right format"})}

    //-------------- age validation -----------------//
    if(!req.body.age){ return res.status(201).send("please enter age") }
    if(age >= 0 &&  age <= 200)  { return res.status(201).send("please enter age")}
   
    //---------------Gender validation -----------------//
    if(!req.body.Gender){
     return res.status(201).send("please enter Gender")
    }

    if(req.body.Gender !=="Female"  ){
    if(req.body.Gender !=="Male"  ){
    if(req.body.Gender !=="Other"  ){return res.status(400).send({status:false,message:"Should be Female, Male, Other"}) }}}
     
    //---------------Email validation -----------------//
    if(!req.body.Email){
     return res.status(201).send("please enter Email")
    }
  
    const isRegisterEmail = await User.findOne({ Email: req.body.Email })

    if (isRegisterEmail) return res.status(400).send({ status: false, message: "Email id already registered" })
    //--------------- validation for profile -----------------//
    const files = req.files
    const profilePicture = await uploadFile(files[0])

  

    const registerEmp= {
      Name: req.body.Name,
      age: req.body.age,
      Gender: req.body.Gender,
      Email: req.body.Email,
      uploadfile: profilePicture

    }
  
    const register = await User.create(registerEmp);
  
    res.status(201).send(register)
  }
  catch(err){
    return res.status(500).json(err);
  }
})
  

1
//update user
router.put("/:id", async (req, res) => {
  if ( req.params.id) {
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
}

);

//delete user
router.delete("/:id", async (req, res) => {
  if (req.params.id ) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    } 
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/getdata", async (req, res) => {
   try {  
      let data=  await User.find().sort({ _id: -1 }).limit(5)
 res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});






module.exports = router;
