import User from "../models/Users"
import jwt from jasonwebtoken
import User from "../models/Users";

export const reqisterUser = async (req,res)=>{
    try{
    const {
        name,
        email,
        password,
        confirmPassword,
        role
    } = req.body;
    if( !name || 
        !email ||
        !password ||
        !confirmPassword ||
        !role
    ){
        return res.status(400).json({
            message: " All fields are required "
        });
    }

    if(password != confirmPassword){
        return res.status(400).json({
            message: "Passwords do not Match"
        })
    }
   const existingUser = await User.findOne({
    email ,
    })
        
        if(existingUser){
            return res.status(400).json({
                message: "User already exist "
            })
        }

            const user = await User.create({
                name,
                email,
                password,
                confirmPassword,
                role
            })
             
            const token = jwt.sign(
                {
                    id:user._id,
                },
                process.env.JWT_SECRET,
                process.env.JWT_EXPIRE
            )

            res.status(201).json({
                success:true,
                token,
                user
            })
        }
        catch(error){
            res.status(500).json({
                message: "Error Error Error"
            });
        }

};
export const loginUser =async (req,res)=>{
    try{
    const {
        email,
        password
    } = req.body

    if(!email || !password ){
        return res.status(400).json({
            message: " All fields required "
        })
    }
    const user = await User.findOne("email")

    if(!user){
        return res.status(400).json({
            message:"User do not exist , sign Up first "
        })
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    if(!isMatch) {
        return res.status(401).json({
            message: "Wrong credential"
        })
    }

    jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRE
    )

    return res.status(201).json({
        success: true,
        token,
        user

    });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }

};

