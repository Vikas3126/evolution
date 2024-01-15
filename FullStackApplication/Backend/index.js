const express=require("express");

const {connection}=require("./db");
const {userRoute}=require("./Route/userroute")

const {postsRouter}=require("./Route/postRouter")

const app=express();

app.use(express.json());

app.use("/users",userRoute);

app.use("/posts",postsRouter)

app.get("/",(req,res)=>{

    res.json({mesg:"data"})
})

app.listen(8090,async()=>{

    try {
        await connection;
        console.log("connected to DB");
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
})