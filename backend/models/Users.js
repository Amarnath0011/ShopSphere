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
        type: string , 
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
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
       return next();
    }
    this.password = await bcrypt.hash(this.password,12);
    return next();
})

userSchema.methods.matchPassword() = async function(enteredPassword){
        return bcrypt.compare(enteredPassword,this.password)
};

const User =  mongoose.model("User", userSchema);

export default User;