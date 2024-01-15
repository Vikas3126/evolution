
const jwt=require('jsonwebtoken');

const {UserModel}=require("../model/user.model");

const auth=async(req,res,next)=>{


        const token=req.headers.authorization?.split(" ")[1];

        if(token){

            try {
                const decoded=jwt.verify((token,"masai"));

                if(decoded){
                    req.body.userID=decoded.userID
                    req.token=decoded.token
                    req.body.userName=decoded.user
                    next();
                }
                else{
                    res.json({mesg:"you are not authorized"})

                }

            } catch (error) {
                res.json({mesg:"you are not authorized"})
            }
           
        }else{
            res.json({mesg:"please login"})
        }
}

module.exports={
    auth
}