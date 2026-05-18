const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"name is required"]
    }, 
    email: {
        type: String, 
        required: [true,"email is required"],
        unique : true
    },
    password:{
        type: String , 
        required: [true,"Password is required"],
        select:false
    },
    
    role:{
        type: String,
        enum:["user","admin","seller"],
        default: "user"
    },
    },
    {
        timestamps:true
    }  
);
userSchema.pre("save", async function(){
    if(!this.isModified("password")){
       return ;
    }
    this.password = await bcrypt.hash(this.password,12);
})

userSchema.methods.matchPassword = async function(enteredPassword){
        return bcrypt.compare(enteredPassword,this.password)
};

const User =  mongoose.model("User", userSchema);

module.exports  =  User;