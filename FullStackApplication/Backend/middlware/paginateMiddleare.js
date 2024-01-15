
const paginate=(model)=>{

    async(req,res,next)=>{

        const page=parseInt(req.query.page)||1;
        const limit=3;
        const skip=(page-1)*limit;


        req.pagination={
            page,limit,skip
        }
        const totalDoc=await model.coutDocuments();
        const totalPages=math.ceil(totalDoc/limit);
        req.pagination.totalPages=totalPages;

        next();
    }
}

module.exports={
    paginate
}