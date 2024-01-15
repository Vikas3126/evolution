const express=require("express");

const {auth}=require("../middlware/authMiddleware");

const {postModel}=require("../model/postModel");
const {paginate}=require("../middlware/paginateMiddleare");

const postRouter=express.Router();

postRouter.use(auth);

postRouter.post("/add",async(req,res)=>{

    try {
        const postData=new postModel({...req.body,user:req.user._id});
        await postData.save();
        res.status(200).json({mesg:"A new post has been added"})

    } catch (error) {
        res.status(400).json({mesg:error})
    }
})

postRouter.get('/',paginate(postModel),async(req,res)=>{

    try {
        const userId=req.userId;
        const {page,totalPages}=req.pagination;
        const {user,minCom,maxCom,device}=req.query;

        let query={userId};

        if(user){
            query={userId,'user.name':user}
        }
        if(minCom!==undefined && maxCom!==undefined){
            query={...query,comments:{$gte:minCom,$lte:maxCom}}
        }

        if(device){
            query={...query,device}
        }

        const postsData=await postModel.find(query).limit(req.pagination.limit).skip(req.pagination.skip)
        res.json({posts,page,totalPages});

    } catch (error) {
        
    }
})

postRouter.get("/top",paginate(postModel),async(req,res)=>{

    try {
        const userId=req.userId;
        const {page,totalPages}=req.pagination;
      
       
        const postsData=await postModel.find(userId).sort({comments:-1}).limit(req.pagination.limit).skip(req.pagination.skip)
        res.json({posts,page,totalPages});

    } catch (error) {
        res.json({mesg:error});
    }
})

postRouter.put("/update/:postId",async(req,res)=>{

    try {
        const{content}=req.body;
        const userId=req.userId;
        const postId=req.params.postId;
        const post=await postModel.findOneUpdate({_id:postId,userId},{content});

        if(!post){
            
            res.status(200).json({mesg:"post not fount"})
        }
        else{
            res.json({post})
        }

    } catch (error) {
        res.json({mesg:error})
    }
})

postRouter.put("/update/:postId",async(req,res)=>{

    try {
        
        const userId=req.userId;
        const postId=req.params.postId;
        const post=await postModel.findOneUpdate({_id:postId,userId});

        if(!post){
            
            res.status(200).json({mesg:"post not found"})
        }
        else{
            res.json({mesg:"post deleted succesfully"})
        }

    } catch (error) {
        res.json({mesg:error})
    }
})

