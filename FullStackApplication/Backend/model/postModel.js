const  mongoose=require("mongoose");

const PostSchema=mongoose.Schema({
    title:{type:String},
    body:{type:String},
    device:{type:String,enum:['Laptop','Tablet']},
    no_of_comments:{type:String},

})

const Post=mongoose.model("Post",PostSchema);

module.exports={
    Post
}