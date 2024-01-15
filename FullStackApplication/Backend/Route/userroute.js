
const express=require("express");

const {UserModel}=require("../model/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jwt");



const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{

    const {name,email,gender,pass,age,city}=req.body;

    try {
        
        bcrypt.hash(pass,5,async(err,hash)=>{

            if(err){
                res.status(200).json({mesg:err})
            }
            else{
                const user=new UserModel({name,email,gender,pass:hash,age,city});
                await user.save();
                res.status(200).json({mesg:"new user registerd"});
            }
        })
    } catch (error) {
        res.status(400).json({mesg:err});
    }
})


userRouter.post("/login",async(req,res)=>{

    try {
        const {email,pass}=req.body;
        
        const user=await UserModel.findOne({email});

        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{

                if(result){
                    res.status(200).json({mesg:"login succesful",token:jwt.sign({_id:user._id,},"masai",{expiresIn:"7d"})});
                }
                else{
                    res.status(200).json({mesg:"wrong credentals"});
                }
            })
        }
        else{
            res.status(200).json({mesg:"wrong credentals"});
        }
    } catch (error) {
        console.log(error)
    }
})

userRouter.get("/logout",async(req,res)=>{

    try {
        req.user.token=req.user.tokens.filter(token=>token.token!=req.token);
        await req.user.save();
        res.status(200).json({mesg:"logout succussful"});
    } catch (error) {
        res.status(500).json({errpr:error})
    }
})

module.exports={
    userRouter
}