const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            require: true,
            min: 3,
            max: 20,

        },


        age: {
            type: Number,
            required: true,
            max: 50,
           
        },
        Gender: {
            type: String,
            enum:["Female","Male","Other"],
            trim:true

        },
        Email: {
            type: String,  
            required: true, 
            unique: true  

        },
      
        uploadfile: {
            type: String,
            defaut: ""
          
        },
      


    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

